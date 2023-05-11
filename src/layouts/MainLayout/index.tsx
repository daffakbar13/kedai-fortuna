import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Stack from '@mui/material/Stack'

export default function MainLayout(props: React.PropsWithChildren) {
  const { children } = props
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="medium" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
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
    </>
  )
}
