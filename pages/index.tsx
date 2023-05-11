import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded'
import { useFortunaQuery } from '@fortuna/utils/hooks'

export default function Home() {
  const products = useFortunaQuery('productList')
  return (
    <Grid container columns={6} spacing={1.5}>
      {products.isSuccess && (
        <>
          {products.data.map((p, i) => (
            <Grid key={i} item xs={3} sm={2} md={1}>
              <Stack bgcolor="white" borderRadius={1} padding={1}>
                <Typography variant="subtitle1" noWrap>
                  {p.productName}
                </Typography>
                <Typography variant="subtitle2">Rp. {p.price.toLocaleString()}</Typography>
                <Typography variant="subtitle2" color="gray">
                  Stok : {p.stock}
                </Typography>
                <Stack direction="row-reverse">
                  <AddCircleOutlineRoundedIcon />
                </Stack>
              </Stack>
            </Grid>
          ))}
        </>
      )}
    </Grid>
  )
}
