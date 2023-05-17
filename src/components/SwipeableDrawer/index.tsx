import { SwipeableDrawer as MuiSwipeableDrawer, SwipeableDrawerProps } from '@mui/material'
import React from 'react'

export default function SwipeableDrawer(props: SwipeableDrawerProps) {
  const { anchor } = props
  const isTopOrBottom = anchor === 'top' || anchor === 'bottom'

  return (
    <MuiSwipeableDrawer
      {...props}
      PaperProps={{
        sx: {
          ...(isTopOrBottom && {
            borderRadius: (t) => t.spacing(2, 2, 0, 0),
            maxHeight: '80vh',
          }),
        },
      }}
      disableSwipeToOpen
      disableBackdropTransition
    />
  )
}
