import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { 
      main: "#DE8872", 
      light: "#E8A898", 
      dark: "#C96E5A" 
    },
    secondary: { 
      main: "#A7D0CD", 
      light: "#C1E0DE", 
      dark: "#8DBAB7" 
    },
    background: { 
      default: "#000000", 
      paper: "#121212" 
    },
    text: { 
      primary: "#FFFFFF", 
      secondary: "#E0E0E0" 
    },
    accent: { 
      main: "#AED9D6", 
      light: "#C6E5E3", 
      dark: "#96C4C1" 
    },
    neutral: { 
      main: "#AAD4D1", 
      light: "#C2E0DE", 
      dark: "#92BAB7" 
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          minHeight: '100vh',
          backgroundColor: '#000000'
        },
      },
    },
  },
})

export { theme }
