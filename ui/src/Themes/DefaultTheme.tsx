// 1. Import `extendTheme`
import { extendTheme } from "@chakra-ui/react"

const defaultTheme = extendTheme({})
// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
  colors: {
    brand: defaultTheme.colors.blue
  },
})

export default theme