import { create } from 'zustand'
import { MainStates } from './types/states'
import { MainActions } from './types/actions'

const useMainStore = create<MainActions & MainStates>()((set, get) => ({
  contentWidth: 0,
  maxContentWidth: 480,
  isMainDrawerOpen: false,
  isLanguageDrawerOpen: false,
  leftContent: 0,
  rightContent: 0,
  sideOffset: 0,
  isLoginModalOpen: false,
  signInMode: 'sign in',
  togleMainDrawer: (open) => (event) =>
    set(() => {
      if (event) {
        const isKeydown = event.type === 'keydown'
        const isPressTab = (event as React.KeyboardEvent).key === 'Tab'
        const isPressShift = (event as React.KeyboardEvent).key === 'Shift'
        if (isKeydown && (isPressTab || isPressShift)) {
          return {}
        }
      }

      return { isMainDrawerOpen: open }
    }),
  openMainDrawer(event) {
    set(({ togleMainDrawer }) => {
      togleMainDrawer(true)(event)
      return {}
    })
  },
  closeMainDrawer(event) {
    set(({ togleMainDrawer }) => {
      togleMainDrawer(false)(event)
      return {}
    })
  },
  handleLeftRightContent() {
    const { contentWidth, maxContentWidth, sideOffset } = get()
    const { clientWidth } = document.body

    if (clientWidth > maxContentWidth) {
      const newSideOffset = (clientWidth - maxContentWidth) / 2
      const newLeftContent = newSideOffset
      const newRightContent = maxContentWidth - newSideOffset
      const isNotSame = newSideOffset !== sideOffset

      if (isNotSame) {
        set(() => ({
          contentWidth: maxContentWidth,
          leftContent: newLeftContent,
          rightContent: newRightContent,
          sideOffset: newSideOffset,
        }))
      }
    } else {
      if (contentWidth !== clientWidth) {
        set({ contentWidth: clientWidth })
      }
      if (sideOffset !== 0) {
        set(() => ({ leftContent: 0, rightContent: 0, sideOffset: 0 }))
      }
    }
  },
  openLanguageDrawer() {
    set(() => ({ isLanguageDrawerOpen: true }))
  },
  closeLanguageDrawer() {
    set(() => ({ isLanguageDrawerOpen: false }))
  },
  getCarouselHeight() {
    const { contentWidth } = get()
    const isNullContentWidth = contentWidth === 0
    const carouselWidth = isNullContentWidth ? 400 : contentWidth - 32
    const carouselHeight = carouselWidth / 2.76

    return carouselHeight
  },
  openLoginModal() {
    set({ isLoginModalOpen: true })
  },
  closeLoginModal() {
    set({ isLoginModalOpen: false, signInMode: 'sign in' })
  },
  switchSignInMode() {
    set((s) => ({ signInMode: s.signInMode === 'sign in' ? 'sign up' : 'sign in' }))
  },
  isSignInMode() {
    const { signInMode } = get()
    return signInMode === 'sign in'
  },
}))

export default useMainStore
