import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded'
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded'
import { useFortunaQuery } from '@fortuna/utils/hooks'
import { useMutation } from 'react-query'
import axios from 'axios'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import React from 'react'
import { Products } from '@fortuna/services/product/types'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

export default function Home() {
  const products = useFortunaQuery('productList')
  const category = useFortunaQuery('categoryList')
  const [selectedCategory, setSelectedCategory] = React.useState('1')
  const [cart, setCart] = React.useState<Products[]>([])
  const mut = useMutation({
    mutationKey: ['asoy'],
    mutationFn: () => axios.post('api/v1/history/add', { data: cart }),
    onSuccess: () => {
      products.refetch()
      setCart([])
    },
  })

  function handleChangeCategory(e: SelectChangeEvent) {
    setSelectedCategory(e.target.value)
  }

  function addCart(data: Products, type: 'plus' | 'minus') {
    if (type === 'plus') {
      setCart((prev) => [...prev, data])
    }
    if (type === 'minus') {
      setCart((prev) => [
        ...prev.filter((e) => e.productName !== data.productName),
        ...prev.filter((e) => e.productName === data.productName).splice(1),
      ])
    }
  }

  return (
    <Stack gap={2}>
      {category.isSuccess && (
        <FormControl fullWidth>
          <Select
            id="demo-simple-select-autowidth"
            value={selectedCategory}
            onChange={handleChangeCategory}
          >
            {category.data.map((c, i) => (
              <MenuItem key={i} value={c.id}>
                {c.categoryName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      <Grid container columns={6} spacing={1.5}>
        {products.isSuccess && (
          <>
            {products.data
              .filter((p) => p.productCategoryId === Number(selectedCategory))
              .map((p, i) => {
                const inCart = cart.filter((c) => c.productName === p.productName).length
                return (
                  <Grid key={i} item xs={3} sm={2} md={1}>
                    <Stack bgcolor="white" borderRadius={1} padding={1}>
                      <Typography variant="subtitle1" noWrap>
                        {p.productName}
                      </Typography>
                      <Typography variant="subtitle2">Rp. {p.price.toLocaleString()}</Typography>
                      <Typography variant="subtitle2" color="gray">
                        Stok : {p.stock - inCart}
                      </Typography>
                      <Stack direction="row-reverse" gap={1}>
                        <AddCircleOutlineRoundedIcon
                          onClick={() => {
                            addCart(p, 'plus')
                          }}
                        />
                        {inCart > 0 && (
                          <>
                            {inCart}
                            <RemoveCircleOutlineRoundedIcon
                              sx={{ color: 'red' }}
                              onClick={() => {
                                addCart(p, 'minus')
                              }}
                            />
                          </>
                        )}
                      </Stack>
                    </Stack>
                  </Grid>
                )
              })}
          </>
        )}
      </Grid>
      <Box height={64} />
      {cart.length > 0 && (
        <Box position="fixed" bottom={16} left={16} right={16}>
          <Button fullWidth onClick={() => mut.mutate()}>
            {'Pesan - Rp. '}
            {cart
              .map((c) => c.price)
              .reduce((a, b) => a + b)
              .toLocaleString()}
          </Button>
        </Box>
      )}
    </Stack>
  )
}
