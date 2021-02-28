var path = require('path');
var process = require('process');
var fs = require('fs');

module.exports = {
    packagerConfig: {
        "asar": true,
        "icon": path.join(__dirname, "/assets/app_icons/app_icon"),
        "executableName": "simple-to-do-app",
    },
    makers: [
        {
            "name": "@electron-forge/maker-zip",
            "platforms": [
                "darwin"
            ]
        },
        {
            "name": "@electron-forge/maker-dmg",
            "config": {
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
                "programFilesFolderName": "Simple-To-Do-App",
                "appIconPath": path.join(__dirname, "/assets/app_icons/app_icon.ico"),
                "exe": "simple-to-do-app"
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
    ],
    hooks: {
        postMake: async (forgeConfig, options) => {
            if (process.env.CI && process.env.CURRENT_WORKFLOW === "Publish") {
                var appName = "simple-to-do-app";
                var outputFolder = "./Build-Artifacts";
                for (var i = 0; i < options.length; i++) {
                    if (options[i]["arch"] == "ia32") var currentArch = "x86"
                    else var currentArch = options[i]["arch"]
                    for (var artifact = 0; artifact < options[i]["artifacts"].length; artifact++) {
                        if (options[i]["artifacts"][artifact].includes("deb")) fs.rename(options[i]["artifacts"][artifact], path.join(outputFolder, `${appName}-Linux-${currentArch}.deb`))
                        else if (options[i]["artifacts"][artifact].includes("rpm")) fs.rename(options[i]["artifacts"][artifact], path.join(outputFolder, `${appName}-Linux-${currentArch}.rpm`))
                        else if (options[i]["artifacts"][artifact].includes("dmg")) fs.rename(options[i]["artifacts"][artifact], path.join(outputFolder, `${appName}-MacOS-${currentArch}.dmg`))
                        else if (options[i]["artifacts"][artifact].includes("zip")) fs.rename(options[i]["artifacts"][artifact], path.join(outputFolder, `${appName}-MacOS-${currentArch}.zip`))
                        else if (options[i]["artifacts"][artifact].includes("msi")) fs.rename(options[i]["artifacts"][artifact], path.join(outputFolder, `${appName}-Windows-${currentArch}.msi`))
                    }
                }
            }
        }
    }
}
