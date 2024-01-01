import { Application } from "./application"

export function useTelegramWebApp() {
    const application = new Application()
    return { application }
}

export function useTelegramAppColor() {
    const application = new Application()
    return {
        primary: application.getStyle(),
        button: application.getButtonStyle(),
        secondary: application.getSecondaryStyle(),
        theme: application.getTheme()
    }
}