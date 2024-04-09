import { AppTheme, AppStyle } from "./type";

export class Application {
    isMiniApp() : boolean {
        return !!window.Telegram.WebView.initParams.tgWebAppThemeParams

    }
    getDefaultTheme() : AppTheme {
        return {
            bgColor: '#FFFFFF',
            textColor: '#000000',
            hintColor: '#C0C0C0',
            linkColor: '#0000FF',
            buttonColor: '#1E90FF',
            buttonTextColor: '#FFFFFF',
            secondaryBgColor: '#DCDCDC',
        }
    }
    getTheme() : AppTheme {
        console.log(window.Telegram)
        if(!this.isMiniApp()) {
            return this.getDefaultTheme()
        }
        const appTheme = JSON.parse(
            window.Telegram.WebView.initParams.tgWebAppThemeParams
        );
        return {
            bgColor: appTheme.bg_color,
            textColor: appTheme.text_color,
            hintColor: appTheme.hint_color,
            linkColor: appTheme.link_color,
            buttonColor: appTheme.button_color,
            buttonTextColor: appTheme.button_text_color,
            secondaryBgColor: appTheme.secondary_bg_color,
        }
    }

    getStyle() : AppStyle {
        const theme = this.getTheme()
        return {
            background: theme.secondaryBgColor,
            color: theme.textColor
        }
    }

    getButtonStyle() : AppStyle {
        const theme = this.getTheme()
        return {
            color: theme.buttonTextColor,
            background: theme.buttonColor
        }
    }

    getSecondaryStyle() : AppStyle {
        const theme = this.getTheme();
        return {
            color: theme.hintColor,
            background: theme.bgColor
        }
    }

    getHeaderStyle() : AppStyle {
        const theme = this.getTheme()
        return {
            background: theme.bgColor,
            color: theme.textColor
        }
    }

    close() {
        window.Telegram.WebApp.close()
    }

    sendDataToBot(payload: any) {
        try {
            const data = JSON.stringify(payload)
            window.Telegram.WebApp.sendData(data)
        } catch (e) { console.log(e) }
    }
}