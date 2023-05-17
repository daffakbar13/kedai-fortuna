import { LocalizationProvider as MuiLocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

export default function LocalizationProvider(props: React.PropsWithChildren) {
  const { children } = props
  return <MuiLocalizationProvider dateAdapter={AdapterMoment}>{children}</MuiLocalizationProvider>
}
