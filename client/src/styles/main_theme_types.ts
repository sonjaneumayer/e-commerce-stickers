export interface IThemeColors {
  primary: string[]
  secondary: string[]
}

export interface IThemeShadows {
  md: string
  xl: string
}

export interface IThemeHeadings {
  fontFamily: string
  sizes: {
    h1: {
      fontSize: string
    }
  }
}

export interface IThemeBreakpoints {
  xs: string
  sm: string
  md: string
  lg: string
  xl: string
}

export interface IThemeComponentStyles {
  [componentName: string]: {
    defaultProps?: {
      variant?: string
    }
    styles?: (theme: any) => Record<string, any>
  }
}

export interface IMainThemeState {
  isDarkTheme: boolean
  toggleTheme: () => void
}

export interface IMainThemeContext {
  isDarkTheme: boolean
  toggleTheme: () => void
}
export interface IMainTheme {}
