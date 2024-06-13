// pages/api/swap.ts
import { NextApiRequest, NextApiResponse } from 'next/types'
import { ethers } from 'ethers'
import swapTokens from '../../../../utils/swap'
import { parseEther, parseUnits } from 'ethers/lib/utils'
import { PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js'
import { Token, Percent, TokenAmount, TOKEN_PROGRAM_ID } from '@raydium-io/raydium-sdk'
import { execSwap } from '@/utils/exec_swap'
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

const automateSwaps = async (
    baseToken: Token,
    quoteToken: Token,
    baseTokenSwapAmount: number,
    quoteTokenSwapAmount: number,
    duration: number
) => {
    const endTime = Date.now() + duration

    while (Date.now() < endTime) {
        let inputTokenAmount = new TokenAmount(
            baseToken,
            new BN(baseTokenSwapAmount).mul(new BN(10).pow(new BN(quoteToken.decimals)))
        )
        const slippage = new Percent(1, 100)

        const targetPool = 'CimQKr5n4cD4kLP3vemH5rEiJc84jgL48ocV1BVo8xwW'

        // swap WSOL to FURY
        await execSwap({
            targetPool,
            outputToken: quoteToken,
            inputTokenAmount,
            slippage,
            wallet: process.env.SOLANA_PRIVATE_KEY
        })

        console.log('Swap WSOL to FURY succesfully')

        // swap FURY to WSOL

        inputTokenAmount = new TokenAmount(
            quoteToken,
            new BN(quoteTokenSwapAmount).mul(new BN(10).pow(new BN(baseToken.decimals)))
        )

        await execSwap({
            targetPool,
            outputToken: baseToken,
            inputTokenAmount,
            slippage,
            wallet: process.env.SOLANA_PRIVATE_KEY
        })

        console.log('Swap FURY to WSOL succesfully')
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
            const { baseTokenSwapAmount, quoteTokenSwapAmount } = req.body

            try {
                const baseToken = DEFAULT_TOKEN.WSOL // WSOL

                const quoteTokenInfo = {
                    decimals: 9,
                    symbol: 'Test1',
                    tokenName: 'Test1'
                }
                const quoteToken = new Token(
                    TOKEN_PROGRAM_ID,
                    new PublicKey('7oU5jRkqjjKD4a9JBDPZvs6X4zPJSvqXHDECRbb9jYNH'),
                    quoteTokenInfo.decimals,
                    quoteTokenInfo.symbol,
                    quoteTokenInfo.tokenName
                )

                await automateSwaps(baseToken, quoteToken, +baseTokenSwapAmount, +quoteTokenSwapAmount, 3600000)

                res.status(200).json({ message: 'Solana Trade process completed successfully' })
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
