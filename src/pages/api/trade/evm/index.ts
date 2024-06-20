// pages/api/swap.ts
import { NextApiRequest, NextApiResponse } from 'next/types'
import { ethers } from 'ethers'
import { parseEther, parseUnits } from 'ethers/lib/utils'
import { swapExactTokensForTokens, swapTokensForExactTokens } from '@/utils/swap'
import { result } from 'lodash'

export interface ResponseFuncs {
    GET?: any
    POST?: any
}

const baseToken = '0x9848422A708960e6f416f719006328077Ad1816A'
const quoteToken = '0xB88b5F025382AaDaC2F87A01f950223e7Ee68a1b'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs

    const handleCase: ResponseFuncs = {
        // RESPONSE FOR GET REQUESTS
        GET: async (req: NextApiRequest, res: NextApiResponse) => {
            res.status(200).json({ result: true, data: { baseToken, quoteToken } })
        },
        // RESPONSE POST REQUESTS
        POST: async (req: NextApiRequest, res: NextApiResponse) => {
            const privateKey = process.env.EVM_PRIVATE_KEY

            const { amount } = req.body

            if (!privateKey) {
                res.status(400).json({ error: 'Missing private key in environment variables' })
                return
            }

            const provider = new ethers.providers.JsonRpcProvider(
                'https://eth-sepolia.g.alchemy.com/v2/mGsqrKffb5Yt_jmlL0UsiyPz8ZT7jBCv'
            )

            try {
                // await automateSwaps(provider, privateKey, baseToken, quoteToken, duration)
                const hash1 = await swapExactTokensForTokens(provider, privateKey, baseToken, quoteToken, parseEther(amount))
                await new Promise(resolve => setTimeout(resolve, 5000))
                // Swap quoteToken to baseToken
                const hash2 = await swapTokensForExactTokens(provider, privateKey, baseToken, quoteToken, parseEther(amount))
                res
                    .status(200)
                    .json({ result: true, message: 'Automate Trade process completed successfully', data: { hash1, hash2 } })
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
