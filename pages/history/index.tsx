import { useFortunaQuery } from '@fortuna/utils/hooks'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { DataGrid } from '@mui/x-data-grid'
import { DatePicker } from '@mui/x-date-pickers'
import moment from 'moment'
import React from 'react'

type DataColumn = Array<{ date: string; productName: string; price: number; quantity: number }>

export default function History() {
  const [from, setFrom] = React.useState<moment.Moment | null>(moment())
  const [to, setTo] = React.useState<moment.Moment | null>(moment())
  const history = useFortunaQuery('historyList')

  function getData() {
    const results: DataColumn = []
    if (history.isSuccess) {
      history.data
        .filter((h) => moment(h.date).isBetween(from?.startOf('days'), to?.endOf('days')))
        .forEach((h) => h.products.forEach((p) => results.push({ ...h, ...p })))
    }

    return results.map((e, i) => ({ id: i, ...e }))
  }

  return (
    <Stack gap={2}>
      <Stack direction="row" gap={2}>
        <Stack gap={1}>
          From :
          <DatePicker value={from} disableFuture onChange={(e) => setFrom(e)} />
        </Stack>
        <Stack gap={1}>
          To :
          <DatePicker
            value={to}
            disableFuture
            // shouldDisableDate={(day) => moment(day).isSameOrBefore(from, 'dates')}
            onChange={(e) => setTo(e)}
          />
        </Stack>
      </Stack>
      <Box height={300}>
        <DataGrid
          columns={[
            {
              field: 'date',
              headerName: 'Tanggal',
              valueGetter(e) {
                return moment(new Date(e.value)).format('DD-MM-YYYY')
              },
            },
            {
              field: 'jam',
              headerName: 'Jam',
              valueGetter(e) {
                return moment(new Date(e.row.date)).format('H:mm')
              },
            },
            {
              field: 'productName',
              headerName: 'Produk',
              width: 200,
              filterable: true,
            },
            {
              field: 'price',
              headerName: 'Harga Produk',
              valueGetter(params) {
                return params.value.toLocaleString()
              },
            },
            {
              field: 'quantity',
              headerName: 'Jumlah Beli',
            },
            {
              field: 'total',
              headerName: 'Total',
              valueGetter(e) {
                return (e.row.price * e.row.quantity).toLocaleString()
              },
            },
          ]}
          rows={getData()}
        />
      </Box>
      <Button>
        {'Total: Rp. '}
        {getData()
          .map((e) => e.price * e.quantity)
          .reduce((a, b) => a + b)
          .toLocaleString()}
      </Button>
    </Stack>
  )
}
