import { useState } from 'react'
import {
  ColorSchemeProvider,
  MantineProvider,
  ColorScheme,
} from '@mantine/core'
import { ReactNode } from 'react'
import { Button } from './button'
import { Input } from './input'
import { ActionIcon } from './actionIcon'
import { Container } from './container'
interface IMainTheme {
  children: ReactNode
}

export const MainTheme = ({ children }: IMainTheme) => {
  // toggle color scheme
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light')
  const toggleColorScheme = (value?: 'light' | 'dark') =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        inherit
        theme={{
          fontFamily: 'Noto Sans',
          colorScheme,
          primaryColor: 'orange',

          colors: {
            orange: [
              '#fff4e2',
              '#ffe9cc',
              '#ffd09c',
              '#fdb766',
              '#fca13a',
              '#fb931d',
              '#fc8c0c',
              '#e17900',
              '#c86a00',
              '#ae5a00',
            ],
            green: [
              '#EAF1F0',
              '#C2D7D4',
              '#ADCAC6',
              '#85B0AA',
              '#5C968E',
              '#347c72',
              '#29635B',
              '#1F4A44',
              '#14312D',
              '#0F2522',
            ],
            oceanBlue: [
              '#7AD1DD',
              '#5FCCDB',
              '#44CADC',
              '#2AC9DE',
              '#1AC2D9',
              '#11B7CD',
              '#09ADC3',
              '#0E99AC',
              '#128797',
              '#147885',
            ],
          },

          shadows: {
            md: '1px 1px 3px rgba(0, 0, 0, .25)',
            xl: '5px 5px 3px rgba(0, 0, 0, .25)',
          },

          headings: {
            fontFamily: 'Roboto, sans-serif',
            sizes: {
              h1: { fontSize: '3rem' },
              h2: { fontSize: '2.5rem' },
              h3: { fontSize: '1rem' },
            },
          },
          breakpoints: {
            xs: '30em',
            sm: '48em',
            md: '64em',
            lg: '74em',
            xl: '90em',
          },
          components: {
            Button,
            Input,
            ActionIcon,
            Container,
          },
        }}
      >
        {children}
      </MantineProvider>
    </ColorSchemeProvider>
  )
}
