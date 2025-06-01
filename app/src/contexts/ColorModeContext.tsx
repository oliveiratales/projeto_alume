import { createContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import type { PaletteMode } from '@mui/material'
import { getDesignTokens } from '../theme/theme'

interface Props {
  children: ReactNode
}

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
  mode: 'light' as PaletteMode,
})

export function ColorModeProvider({ children }: Props) {
  const [mode, setMode] = useState<PaletteMode>('light')

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => setMode(prev => (prev === 'light' ? 'dark' : 'light')),
      mode,
    }),
    [mode]
  )

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode])

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  )
}
