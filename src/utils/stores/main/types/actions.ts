/* eslint-disable no-unused-vars */

type TogleEvent = React.KeyboardEvent | React.MouseEvent

export type MainActions = {
  togleMainDrawer(open: boolean): (event: TogleEvent) => void
  openMainDrawer(event: TogleEvent): void
  closeMainDrawer(event: TogleEvent): void
  handleLeftRightContent(): void
  openLanguageDrawer(): void
  closeLanguageDrawer(): void
  getCarouselHeight(): number
  openLoginModal(): void
  closeLoginModal(): void
  switchSignInMode(): void
  isSignInMode(): boolean
}
