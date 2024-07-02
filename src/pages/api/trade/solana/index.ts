// pages/api/swap.ts
import { NextApiRequest, NextApiResponse } from 'next/types'
import { ethers } from 'ethers'
import { parseEther, parseUnits } from 'ethers/lib/utils'
import { PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js'
import { Token, Percent, TokenAmount, TOKEN_PROGRAM_ID } from '@raydium-io/raydium-sdk'
import { execSwapExactTokensForTokens, execSwapTokensForExactTokens } from '@/utils/exec_swap'
import { DEFAULT_TOKEN } from '@/utils/config'

// import { execSwap } from './src/exec_swap.js'

// import {
//     connection,
//     myKeyPair,
//     DEFAULT_TOKEN,
// } from './config.js'

// import {
//     getWalletTokenAccount,
//     sleepTime
// } from './src/util.js'

import BN from 'bn.js'

export interface ResponseFuncs {
    GET?: any
    POST?: any
}

// const automateSwaps = async (
//     baseToken: Token,
//     quoteToken: Token,
//     swapAmount: number,
//     quoteTokenSwapAmount: number,
//     duration: number
// ) => {
//     const endTime = Date.now() + duration

//     while (Date.now() < endTime) {
//         let inputTokenAmount = new TokenAmount(
//             baseToken,
//             new BN(swapAmount).mul(new BN(10).pow(new BN(quoteToken.decimals)))
//         )
//         const slippage = new Percent(1, 100)

//         const targetPool = 'CimQKr5n4cD4kLP3vemH5rEiJc84jgL48ocV1BVo8xwW'

//         // swap WSOL to FURY
//         await execSwap({
//             targetPool,
//             outputToken: quoteToken,
//             inputTokenAmount,
//             slippage,
//             wallet: process.env.SOLANA_PRIVATE_KEY
//         })

//         console.log('Swap WSOL to FURY succesfully')

//         // swap FURY to WSOL

//         inputTokenAmount = new TokenAmount(
//             quoteToken,
//             new BN(quoteTokenSwapAmount).mul(new BN(10).pow(new BN(baseToken.decimals)))
//         )

//         await execSwap({
//             targetPool,
//             outputToken: baseToken,
//             inputTokenAmount,
//             slippage,
//             wallet: process.env.SOLANA_PRIVATE_KEY
//         })

//         console.log('Swap FURY to WSOL succesfully')
//         // Wait for 5 seconds
//         await new Promise(resolve => setTimeout(resolve, 5000))
//     }
// }

const baseTokenInfo = {
    decimals: 9,
    symbol: 'FURY MOCK TOKEN',
    tokenName: 'FURY'
}
const baseToken = new Token(
    TOKEN_PROGRAM_ID,
    new PublicKey('7QWdfdiqoGQKPaCnLiEzdt5WaLrGMFWGh7i7f3q6UN8U'),
    baseTokenInfo.decimals,
    baseTokenInfo.symbol,
    baseTokenInfo.tokenName
)

const quoteToken = DEFAULT_TOKEN.WSOL // WSOL

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs

    const handleCase: ResponseFuncs = {
        // RESPONSE FOR GET REQUESTS
        GET: async (req: NextApiRequest, res: NextApiResponse) => {
            res
                .status(200)
                .json({ result: true, data: { baseToken: baseToken.programId, quoteToken: quoteToken.programId } })
        },
        // RESPONSE POST REQUESTS
        POST: async (req: NextApiRequest, res: NextApiResponse) => {
            const { solana_private_key, amount } = req.body

            try {
                const slippage = new Percent(1, 100)

                const targetPool = '72rv8UWHd2nAScwXZJKtzYUa65LEcp4o9fgLexurPdpE'

                // swap base to quote - FURY to WSOL
                const inputTokenAmount = new TokenAmount(
                    baseToken,
                    new BN(amount).mul(new BN(10).pow(new BN(quoteToken.decimals)))
                )

                const hash1 = await execSwapExactTokensForTokens({
                    targetPool,
                    outputToken: quoteToken,
                    inputTokenAmount,
                    slippage,
                    wallet: solana_private_key
                })

                // swap quote to base - WSOL to FURY
                const outputTokenAmount = new TokenAmount(
                    baseToken,
                    new BN(amount).mul(new BN(10).pow(new BN(quoteToken.decimals)))
                )

                const hash2 = await execSwapTokensForExactTokens({
                    targetPool,
                    inputToken: quoteToken,
                    outputTokenAmount,
                    slippage,
                    wallet: solana_private_key
                })

                // await automateSwaps(baseToken, quoteToken, +swapAmount, +quoteTokenSwapAmount, 3600000)

                res.status(200).json({ result: true, message: 'Solana Trade process completed successfully', data: { hash1, hash2 } })
            } catch (error) {
                console.error('Error handling request:', error)
                res.status(500).json({ error: 'Internal server error' })
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
