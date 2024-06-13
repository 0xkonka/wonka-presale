// pages/api/swap.ts
import { NextApiRequest, NextApiResponse } from 'next/types'
import { ethers } from 'ethers'
import { parseEther, parseUnits } from 'ethers/lib/utils'
import swapTokens from '@/utils/swap'

export interface ResponseFuncs {
    GET?: any
    POST?: any
}

const automateSwaps = async (
    provider: ethers.providers.JsonRpcProvider,
    privateKey: string,
    tokenA: string,
    tokenB: string,
    duration: number
) => {
    const endTime = Date.now() + duration

    while (Date.now() < endTime) {
        // Swap tokenA to tokenB
        await swapTokens(provider, privateKey, tokenA, tokenB, parseEther('1'))
        console.log('swap tokenA completed')
        // Wait for 5 seconds
        await new Promise(resolve => setTimeout(resolve, 5000))
        // Swap tokenB to tokenA
        await swapTokens(provider, privateKey, tokenB, tokenA, parseUnits('1', 6))
        console.log('swap tokenB completed')
        // Wait for 5 seconds
        await new Promise(resolve => setTimeout(resolve, 5000))
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs

    const handleCase: ResponseFuncs = {
        // RESPONSE FOR GET REQUESTS
        GET: async (req: NextApiRequest, res: NextApiResponse) => {
            res.json('Ok')
        },
        // RESPONSE POST REQUESTS
        POST: async (req: NextApiRequest, res: NextApiResponse) => {
            const privateKey = process.env.EVM_PRIVATE_KEY

            if (!privateKey) {
                res.status(400).json({ error: 'Missing private key in environment variables' })
                return
            }

            const tokenA = '0x9848422A708960e6f416f719006328077Ad1816A'
            const tokenB = '0xB88b5F025382AaDaC2F87A01f950223e7Ee68a1b'

            const duration = 3600000 // 1 hour in milliseconds

            const provider = new ethers.providers.JsonRpcProvider(
                'https://eth-sepolia.g.alchemy.com/v2/mGsqrKffb5Yt_jmlL0UsiyPz8ZT7jBCv'
            )

            try {
                await automateSwaps(provider, privateKey, tokenA, tokenB, duration)
                res.status(200).json({ message: 'Automate Trade process completed successfully' })
                // const tx = await swapTokens(provider, privateKey, tokenInAddress, tokenOutAddress, amountIn);
                // res.status(200).json({ tx });
            } catch (error: any) {
                console.error(error)
                res.status(500).json({ error: error.message })
            }
        }
    }

    const response = handleCase[method]
    if (response) {
        try {
            await response(req, res)
        } catch (error) {
            console.error('Error handling request:', error)
            res.status(500).json({ error: 'Internal server error' })
        }
    } else {
        res.status(404).json({ error: 'No Response for This Request' })
    }
}
