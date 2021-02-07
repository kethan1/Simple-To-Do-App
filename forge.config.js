var path = require('path');

module.exports = {
    packagerConfig: {
        "asar": true,
        "icon": path.join(__dirname, "/assets/app_icons/app_icon"),
        "executableName": "simple-to-do-app"
    },
    makers: [
        {
            "name": "@electron-forge/maker-zip",
            "platforms": [
                "darwin",
                "win32",
                "linux"
            ]
        },
        {
            "name": "@electron-forge/maker-dmg",
            "config": {
                "background": './assets/dmg-background.png',
                "format": "ULFO"
            }
        },
        {
            "name": "@electron-forge/maker-wix",
            "config": {
                "language": 1033,
                "manufacturer": "Kethan Vegunta",
                "description": "Simple To Do App!",
                "name": "Simple To Do App",
                "shortName": "SimpleToDoApp",
                "shortcutFolderName": "Simple To Do App",
                "appIconPath": path.join(__dirname, "/assets/app_icons/app_icon.ico")
            }
        },
        {
            "name": "@electron-forge/maker-deb",
            "config": {
                "maintainer": "Kethan Vegunta",
                "icon": path.join(__dirname, "/assets/app_icons/app_icon.png")
            }
        },
        {
            "name": "@electron-forge/maker-rpm",
            "config": {
                "maintainer": "Kethan Vegunta",
                "homepage": "https://github.com/kethan1/Simple-To-Do-App",
                "license": "MIT",
                "icon": path.join(__dirname, "/assets/app_icons/app_icon.png")
            }
        }
    ]
}
