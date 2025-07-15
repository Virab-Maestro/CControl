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

//Themes
const neonTheme = {
    colors: {
        primary: "#FFFFFF",
        secondary: "#00FF85",
        info: "#1E90FF",
        surface: "#FF0099",
        background: "#0D0D0D",
    }
}

const warmTheme = {
    colors: {
        primary: "#F5E8D8",
        secondary: "#FF6F61",
        info: "#DAA520",
        surface: "#FF4500",
        background: "#1C1C1C",
    }
}

const mutedTheme = {
    colors: {
        primary: "#E4E4E4",
        secondary: "#A8DADC",
        info: "#FFC1CC",
        surface: "#B39CD0",
        background: "#2C2C2C",
    }
}

export default createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: "darkTheme",
        themes: {
            darkTheme,
            neonTheme,
            warmTheme,
            mutedTheme,
        }
    }
})
