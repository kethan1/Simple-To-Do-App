var Store = null;
var store = null;

function get_store() {
    if (Store === null) {
        Store = require("electron-store");
        store = new Store();
    }
    return store;
}

function detectColorScheme() {
    const htmlTag = document.getElementsByTagName("html")[0];
    var systemDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark": "light";
    var appTheme = get_store().get("settings.dark_mode_theme");
    if (appTheme === undefined || appTheme === "system") {
        if (appTheme === undefined) get_store().set("settings.dark_mode_theme", "system")
        htmlTag.setAttribute("data-theme", systemDarkMode);
    } else htmlTag.setAttribute("data-theme", appTheme);
}
detectColorScheme();

function ChangeTheme(newTheme) {
    get_store().set("settings.dark_mode_theme", newTheme);
    detectColorScheme();
}

function GetTheme() {
    let appTheme = get_store().get("settings.dark_mode_theme");
    if (appTheme === undefined) {
        get_store().set("settings.dark_mode_theme", "system")
        return "system";
    }
    return appTheme;
}