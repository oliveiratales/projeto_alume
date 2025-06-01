import type { PaletteMode } from '@mui/material'
import type { ThemeOptions } from '@mui/material/styles'

export const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: { main: '#1976d2' },
          background: { default: '#f5f5f5' },
        }
      : {
          primary: { main: '#90caf9' },
          background: { default: '#121212' },
        }),
  },
})
