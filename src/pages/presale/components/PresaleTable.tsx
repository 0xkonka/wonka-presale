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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#343e52'
  },

  '&:nth-of-type(even)': {
    backgroundColor: '#233e52'
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

const PresaleTable: React.FC = () => {
  const { wonkaPrice, capAmount, totalContributedAmount, userInfo } = usePresale()

  const [levelArray, setLevelArray] = React.useState<levelArray[]>([])
  const [totalCap, setTotalCap] = React.useState<bigint>()

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
  }, [wonkaPrice, capAmount])

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell>Presale Level</StyledTableCell>
            <StyledTableCell align='right'>Wonka Price ($)</StyledTableCell>
            <StyledTableCell align='right'>Cap / Chain</StyledTableCell>
            <StyledTableCell align='right'>Total Auctioned</StyledTableCell>
            <StyledTableCell align='right'>% Supply Total</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {levelArray.map(item => (
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
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default PresaleTable
