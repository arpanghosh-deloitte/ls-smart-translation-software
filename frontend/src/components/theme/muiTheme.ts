//Template Theme for the APP

import { createTheme } from "@mui/material";

const theme = createTheme({
  palette:{
    primary:{
      main:"#86BC25", // Deloitte Green
    },
    secondary:{
      main:"#1D1E1C"
    }
  },
  typography:{
    fontFamily:`"Inter","Roboto","sans-serif"`
  }
})
export default theme;