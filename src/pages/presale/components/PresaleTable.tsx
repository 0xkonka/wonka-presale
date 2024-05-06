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

function createData(level: string, price: number, cap: string, total: string, percent: number) {
  return { level, price, cap, total, percent }
}

const rows = [
  createData('1', 0.000005, '$100,000', '$500,000', 5.0),
  createData('2', 0.000006, '$120,000', '$600,000', 5.0),
  createData('3', 0.0000072, '$150,000', '$750,000', 5.2),
  createData('4', 0.00000864, '$200,000', '$1,000,000', 5.8),
  createData('5', 0.00001037, '$250,000', '$1,250,000', 6.0),
  createData('6', 0.00001244, '$300,000', '$1,500,000', 6.0),
  createData('7', 0.00001493, '$400,000', '$2,000,000', 6.7),
  createData('8', 0.000017915, '$480,000', '$2,400,000', 6.7),
  createData('Totals', 0.00002, '$2,000,000', '$10,00,000', 46.4)
]

interface levelArray {
  index: number
  price: bigint
  capAmount: bigint
}

interface Props {
  config: PresaleConfig
}

const PresaleTable: React.FC<Props> = ({ config }) => {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: '20px', backgroundColor: '#330246d4 !important' }}>
      <Table sx={{ minWidth: 700 }} aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell>Auction Tier</StyledTableCell>
            <StyledTableCell align='right'>$WONKA Price</StyledTableCell>
            <StyledTableCell align='right'>Cap / Chain</StyledTableCell>
            <StyledTableCell align='right'>Total Level Cap</StyledTableCell>
            <StyledTableCell align='right'>Supply Total % </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(item => (
            <StyledTableRow key={item.level}>
              <StyledTableCell component='th' scope='row'>
                {item.level}
              </StyledTableCell>
              <StyledTableCell align='right'>${item.price}</StyledTableCell>
              <StyledTableCell align='right'>{item.cap}</StyledTableCell>
              <StyledTableCell align='right'>{item.total}</StyledTableCell>
              <StyledTableCell align='right'>{item.percent}%</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default PresaleTable
