import * as React from 'react'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { usePresale } from '@/context/PresaleContext'
import { LoDashExplicitNumberArrayWrapper } from 'lodash'
import { formatEther, formatUnits, parseUnits } from 'viem'
import { PresaleConfig } from '@/types/presale'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#330246d4',
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#330246d4'
  },

  '&:nth-of-type(even)': {
    backgroundColor: '#3302467d'
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}))

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
  return { name, calories, fat, carbs, protein }
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9)
]

interface levelArray {
  index: number
  price: bigint
  capAmount: bigint
  // supplyPercent: number
}

interface Props {
  config: PresaleConfig
}

const PresaleTable: React.FC<Props> = ({ config }) => {
  const { wonkaPrice, capAmount, totalContributedAmount, userInfo } = usePresale()

  const [levelArray, setLevelArray] = React.useState<levelArray[]>([])
  const [totalCap, setTotalCap] = React.useState<bigint>()
  /*
  React.useEffect(() => {
    const _levelArray: levelArray[] = []
    let _totalCap = BigInt(0)
    for (let i = 0; i < 8; i++) {
      const newItem: levelArray = {
        index: i + 1,
        price: i === 0 ? wonkaPrice : (_levelArray[i - 1].price * BigInt(12)) / BigInt(10),
        capAmount: i === 0 ? capAmount : (_levelArray[i - 1].capAmount * BigInt(12)) / BigInt(10)
      }
      _totalCap += newItem.capAmount
      _levelArray.push(newItem)
    }
    setLevelArray(_levelArray)
    setTotalCap(_totalCap)
  }, [wonkaPrice, capAmount])*/

  return (
    <TableContainer component={Paper} sx={{ borderRadius: '20px', backgroundColor: '#330246d4 !important' }}>
      <Table sx={{ minWidth: 700 }} aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell>Auction Level</StyledTableCell>
            <StyledTableCell align='right'>$WONKA Price</StyledTableCell>
            <StyledTableCell align='right'>Cap / Chain</StyledTableCell>
            <StyledTableCell align='right'>Total Level Cap</StyledTableCell>
            <StyledTableCell align='right'>Supply Total % </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/*levelArray.map(item => (
            <StyledTableRow key={item.index}>
              <StyledTableCell component='th' scope='row'>
                {item.index}
              </StyledTableCell>
              <StyledTableCell align='right'>${(1 / +formatUnits(item.price, 18 - 6)).toFixed(6)}</StyledTableCell>
              <StyledTableCell align='right'>${formatUnits(item.capAmount, 6)}</StyledTableCell>
              <StyledTableCell align='right'>${(+formatUnits(item.capAmount, 6) * 5).toFixed(2)}</StyledTableCell>
              <StyledTableCell align='right'>
                {((Number(item.capAmount) / Number(totalCap)) * 50).toFixed(2)}%
              </StyledTableCell>
            </StyledTableRow>
          ))*/}

          <StyledTableRow>
            <StyledTableCell component='th' scope='row'>
              1
            </StyledTableCell>
            <StyledTableCell align='right'>$0.000005</StyledTableCell>
            <StyledTableCell align='right'>$100,000</StyledTableCell>
            <StyledTableCell align='right'>$500,000</StyledTableCell>
            <StyledTableCell align='right'>5%</StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell component='th' scope='row'>
              2
            </StyledTableCell>
            <StyledTableCell align='right'>$0.000006</StyledTableCell>
            <StyledTableCell align='right'>$120,000</StyledTableCell>
            <StyledTableCell align='right'>$600,000</StyledTableCell>
            <StyledTableCell align='right'>5%</StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell component='th' scope='row'>
              3
            </StyledTableCell>
            <StyledTableCell align='right'>$0.0000072</StyledTableCell>
            <StyledTableCell align='right'>$150,000</StyledTableCell>
            <StyledTableCell align='right'>$750,000</StyledTableCell>
            <StyledTableCell align='right'>5.2%</StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell component='th' scope='row'>
              4
            </StyledTableCell>
            <StyledTableCell align='right'>$0.00000864</StyledTableCell>
            <StyledTableCell align='right'>$200,000</StyledTableCell>
            <StyledTableCell align='right'>$1,000,000</StyledTableCell>
            <StyledTableCell align='right'>5.8%</StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell component='th' scope='row'>
              5
            </StyledTableCell>
            <StyledTableCell align='right'>$0.00001037</StyledTableCell>
            <StyledTableCell align='right'>$250,000</StyledTableCell>
            <StyledTableCell align='right'>$1,250,000</StyledTableCell>
            <StyledTableCell align='right'>6%</StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell component='th' scope='row'>
              6
            </StyledTableCell>
            <StyledTableCell align='right'>$0.00001244</StyledTableCell>
            <StyledTableCell align='right'>$300,000</StyledTableCell>
            <StyledTableCell align='right'>$1,500,000</StyledTableCell>
            <StyledTableCell align='right'>6%</StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell component='th' scope='row'>
              7
            </StyledTableCell>
            <StyledTableCell align='right'>$0.00001493</StyledTableCell>
            <StyledTableCell align='right'>$400,000</StyledTableCell>
            <StyledTableCell align='right'>$2,000,000</StyledTableCell>
            <StyledTableCell align='right'>6.7%</StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell component='th' scope='row'>
              8
            </StyledTableCell>
            <StyledTableCell align='right'>$0.000017915</StyledTableCell>
            <StyledTableCell align='right'>$480,000</StyledTableCell>
            <StyledTableCell align='right'>$2,400,000</StyledTableCell>
            <StyledTableCell align='right'>6.7%</StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell component='th' scope='row'>
              Totals (10 Weeks)
            </StyledTableCell>
            <StyledTableCell align='right'>Launch at $0.00002</StyledTableCell>
            <StyledTableCell align='right'>$2,000,000</StyledTableCell>
            <StyledTableCell align='right'>$10,000,000</StyledTableCell>
            <StyledTableCell align='right'>46.4%</StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default PresaleTable
