import { createTheme, CSSInterpolation, CSSObject, Theme } from '@mui/material'
import { TypographyOptions } from '@mui/material/styles/createTypography'

const themeTypography:TypographyOptions = {
    fontFamily: "'Archivo','Open Sans',sans-serif",
    htmlFontSize: 14,
    fontSize: 14,
    body1: {
        fontFamily: "'Open Sans',sans-serif",
        fontWeight: 300
    },
    body2: {
        fontFamily: "'Archivo',sans-serif",
        fontWeight: 300
    },
    overline: {
        fontFamily: "'Open Sans',sans-serif",
        fontSize: 14
    },
    h1: {
        fontFamily: "'Archivo',sans-serif",
        fontWeight: 500,
        fontSize: `${14 * 4}px`
    },
    h2: {
        fontFamily: "'Archivo',sans-serif",
        fontWeight: 500,
        fontSize: `${14 * 3}px`
    },
    h3: {
        fontFamily: "'Archivo',sans-serif",
        fontWeight: 500,
        fontSize: `${14 * 2.5}px`
    },
    h4: {
        fontFamily: "'Archivo',sans-serif",
        fontWeight: 500,
        fontSize: `${14 * 1.8}px`
    },
    h5: {
        fontFamily: "'Archivo',sans-serif",
        fontWeight: 500,
        fontSize: `${14 * 1.6}px`
    }
}

const themeDefaultOverrides:CSSObject | string | ((theme: Omit<Theme, 'components'>) => CSSInterpolation) | undefined = {
    'main#root': {
        display: 'flex',
        flexDirection: 'column',
        justifyItems: 'center',
        alignContent: 'center'
    },
    '*': {
        transition: 'all 300ms ease-in'
    },
    a: {
        textDecoration: 'none',
        textUnderline: 'none'
    }
}

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#EB5A5A'
        },
        secondary: {
            main: '#404071'
        },
        background: {
            default: '#BFBFBF'
        },
        text: {
            primary: '#5D675B',
            secondary: '#a6ada1',
            disabled: '#c4d2c1'
        },
        error: {
            main: '#e10032'
        },
        warning: {
            main: '#ff974b'
        },
        success: {
            main: '#21bd2a'
        },
        common: {
            black: '#332e2e'
        }
    },
    shape: {
        borderRadius: 4
    },
    spacing: [0, 2, 4, 6, 8, 12],
    typography: {
        ...themeTypography
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                ...themeDefaultOverrides
            }
        }
    }
})

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#EB5A5A'
        },
        secondary: {
            main: '#c6c6ff'
        },
        background: {
            paper: '#BFBFBF',
            default: '#404071'
        },
        text: {
            primary: '#E8E8E8',
            secondary: '#a8a6a6',
            disabled: '#c4d2c1'
        },
        error: {
            main: '#e10032'
        },
        warning: {
            main: '#ff974b'
        },
        success: {
            main: '#21bd2a'
        },
        common: {
            black: '#332e2e'
        }
    },
    shape: {
        borderRadius: 4
    },
    spacing: [0, 2, 4, 6, 8, 12],
    typography: {
        ...themeTypography
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                ...themeDefaultOverrides
            }
        }
    }
})
