import { BigNumber, ethers } from 'ethers'
import routerABI from '@/abi/uniswapRouter.json'

const swapTokens = async (
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

    // Perform the token swap
    const path = [tokenInAddress, tokenOutAddress]
    const to = wallet.address

    try {
        // Estimate gas limit for the transaction
        const estimatedGasLimit = await uniswapRouter.estimateGas.swapExactTokensForTokens(amountIn, 0, path, to, deadline)

        const gasLimit = estimatedGasLimit.mul(110).div(100) // adding 10% buffer to the estimated gas limit

        const tx = await uniswapRouter.swapExactTokensForTokens(amountIn, 0, path, to, deadline, {
            gasLimit: gasLimit,
            maxPriorityFeePerGas: ethers.utils.parseUnits('2', 'gwei'), // example value, adjust as needed
            maxFeePerGas: ethers.utils.parseUnits('50', 'gwei') // example value, adjust as needed
        })

        console.log('Transaction hash:', tx.hash)

        await tx.wait()
        console.log('Transaction confirmed')

        return tx
    } catch (error) {
        console.error('Transaction failed', error)
        throw error
    }
}

export default swapTokens
