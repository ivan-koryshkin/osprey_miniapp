import { AppTheme, AppUser, AppStyle } from "./type";

export class Application {
    getTheme() : AppTheme {
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

    getUser() : AppUser | null {
        let data: string = decodeURI(window.Telegram.WebApp.initData)
        let dataItems = data.split("&")
        const userData = dataItems.filter((item: string) => {
            if(item.search("user=") !== -1) {
                return item
            }
            return undefined
        })
        if(userData) {
            const raw = userData[0].replace("user=", "")
            const decoded = JSON.parse(decodeURIComponent(raw))
            return  {
                id: decoded["id"],
                firstName: decoded["first_name"],
                lastName: decoded["last_name"],
                username: decoded["username"]
            }
        }
        return null
    }
}