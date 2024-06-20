import { BigNumber, ethers } from 'ethers'
import routerABI from '@/abi/uniswapRouter.json'

export const beforeSwapToken = async (
    provider: ethers.providers.JsonRpcProvider,
    privateKey: string,
    tokenInAddress: string,
    amountIn: BigNumber
) => {
    try {
        const wallet = new ethers.Wallet(privateKey, provider)

        const uniswapRouterAddress = '0xC532a74256D3Db42D0Bf7a0400fEFDbad7694008'

        // Approve the Uniswap Router to spend the input token
        const tokenInContract = new ethers.Contract(
            tokenInAddress,
            [
                'function approve(address spender, uint256 amount) public returns (bool)',
                'function allowance(address owner, address spender) public view returns (uint256)',
                'function balanceOf(address owner) public view returns (uint256)'
            ],
            wallet
        )

        // Check token balance
        const balance = await tokenInContract.balanceOf(wallet.address)
        if (balance.lt(amountIn)) {
            throw new Error('Insufficient token balance')
        }

        // Check and approve tokens if needed
        const allowance = await tokenInContract.allowance(wallet.address, uniswapRouterAddress)
        if (allowance.lt(amountIn)) {
            const approveTx = await tokenInContract.approve(uniswapRouterAddress, balance)
            await approveTx.wait()
        }
    } catch (error) {
        console.error('Transaction failed', error)
        throw error
    }
}

export const swapExactTokensForTokens = async (
    provider: ethers.providers.JsonRpcProvider,
    privateKey: string,
    tokenInAddress: string,
    tokenOutAddress: string,
    amountIn: BigNumber
): Promise<ethers.providers.TransactionResponse> => {
    // Connect to the Ethereum network
    const wallet = new ethers.Wallet(privateKey, provider)

    const deadline = Math.floor(Date.now() / 1000) + 60 * 20 // 20 minutes from the current time

    // Define the Uniswap Router contract address and ABI
    const uniswapRouterAddress = '0xC532a74256D3Db42D0Bf7a0400fEFDbad7694008'
    const uniswapRouter = new ethers.Contract(uniswapRouterAddress, routerABI, wallet)

    try {
        beforeSwapToken(provider, privateKey, tokenInAddress, amountIn)

        // Perform the token swap
        const path = [tokenInAddress, tokenOutAddress]
        const to = wallet.address

        console.log('swapExactTokensForTokens')

        // Estimate gas limit for the transaction
        const estimatedGasLimit = await uniswapRouter.estimateGas.swapExactTokensForTokens(amountIn, 0, path, to, deadline)

        const gasLimit = estimatedGasLimit.mul(110).div(100) // adding 10% buffer to the estimated gas limit

        const gasPrice = await provider.getGasPrice();

        const tx = await uniswapRouter.swapExactTokensForTokens(amountIn, 0, path, to, deadline, {
            gasLimit: gasLimit,
            maxPriorityFeePerGas: ethers.utils.parseUnits('2', 'gwei'), // example value, adjust as needed
            maxFeePerGas: gasPrice.add(ethers.utils.parseUnits('2', 'gwei'))
        })

        console.log('Transaction hash:', tx.hash)

        await tx.wait()
        console.log('Transaction confirmed')

        return tx.hash
    } catch (error) {
        console.error('Transaction failed', error)
        throw error
    }
}

export const swapTokensForExactTokens = async (
    provider: ethers.providers.JsonRpcProvider,
    privateKey: string,
    tokenInAddress: string,
    tokenOutAddress: string,
    amountOut: BigNumber
): Promise<ethers.providers.TransactionResponse> => {
    // Connect to the Ethereum network
    const wallet = new ethers.Wallet(privateKey, provider)

    const deadline = Math.floor(Date.now() / 1000) + 60 * 20 // 20 minutes from the current time

    // Define the Uniswap Router contract address and ABI
    const uniswapRouterAddress = '0xC532a74256D3Db42D0Bf7a0400fEFDbad7694008'
    const uniswapRouter = new ethers.Contract(uniswapRouterAddress, routerABI, wallet)

    // Perform the token swap
    const path = [tokenOutAddress, tokenInAddress]
    const to = wallet.address

    console.log('swapTokensForExactTokens')

    try {
        const amountsIn = await uniswapRouter.getAmountsIn(amountOut, path)
        const amountIn = amountsIn[0]

        beforeSwapToken(provider, privateKey, tokenOutAddress, amountIn)

        // Estimate gas limit for the transaction
        const estimatedGasLimit = await uniswapRouter.estimateGas.swapTokensForExactTokens(
            amountOut,
            amountIn,
            path,
            to,
            deadline
        )

        const gasLimit = estimatedGasLimit.mul(110).div(100) // adding 10% buffer to the estimated gas limit
        const gasPrice = await provider.getGasPrice();

        const tx = await uniswapRouter.swapExactTokensForTokens(amountIn, 0, path, to, deadline, {
            gasLimit: gasLimit,
            maxPriorityFeePerGas: ethers.utils.parseUnits('2', 'gwei'), // example value, adjust as needed
            maxFeePerGas: gasPrice.add(ethers.utils.parseUnits('2', 'gwei'))
        })

        console.log('Transaction hash:', tx.hash)

        await tx.wait()
        console.log('Transaction confirmed')

        return tx.hash
    } catch (error) {
        console.error('Transaction failed', error)
        throw error
    }
}
