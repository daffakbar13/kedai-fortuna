import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Stack from '@mui/material/Stack'
import { SwipeableDrawer } from '@fortuna/components'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'
import Divider from '@mui/material/Divider'

export default function MainLayout(props: React.PropsWithChildren) {
  const { children } = props
  const router = useRouter()
  const [drawerMenuOpen, setDrawerMenuOpen] = React.useState(false)

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="medium"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setDrawerMenuOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Kedai Fortuna
          </Typography>
          <Typography variant="subtitle2" component="div">
            Siska
          </Typography>
        </Toolbar>
      </AppBar>
      <Stack component="main" padding={2}>
        {children}
      </Stack>
      <SwipeableDrawer
        anchor="left"
        open={drawerMenuOpen}
        onOpen={() => {
          setDrawerMenuOpen(true)
        }}
        onClose={() => {
          setDrawerMenuOpen(false)
        }}
      >
        <Stack gap={1} padding={2}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Kedai Fortuna
          </Typography>
          <Divider />
          {[
            { name: 'Beli', path: '/' },
            { name: 'Riwayat', path: '/history' },
          ].map((e, i) => (
            <React.Fragment key={i}>
              <Button
                variant="text"
                onClick={() => router.push(e.path)}
                sx={{ justifyContent: 'start', color: 'black', padding: 0 }}
              >
                {e.name}
              </Button>
              <Divider />
            </React.Fragment>
          ))}
        </Stack>
      </SwipeableDrawer>
    </>
  )
}
