import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const darkTheme = {
    colors: {
        primary: "#E0E0E0", //group
        secondary: "#B0B0B0", //goal
        info: "#444444", //text
        surface: "#888888", //accent(buttons)
        background: "#121212", //background
    }
}

export default createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: "darkTheme",
        themes: {
            darkTheme,
        }
    }
})
