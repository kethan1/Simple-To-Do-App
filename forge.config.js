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
            if (process.env.CI) {
                var appName = "simple-to-do-app";
                var outputFolder = "./Build-Artifacts";
                for (let option in options) {
                    console.log(option)
                    if (option["arch"] == "ia32") var currentArch = "x86"
                    else var currentArch = option["arch"]
                    for (let artifact of option["artifacts"]) {
                        if (artifact.includes("deb")) fs.rename(artifact, path.join(outputFolder, `${appName}-Linux-${currentArch}.deb`))
                        else if (artifact.includes("rpm")) fs.rename(artifact, path.join(outputFolder, `${appName}-Linux-${currentArch}.rpm`))
                        else if (artifact.includes("dmg")) fs.rename(artifact, path.join(outputFolder, `${appName}-MacOS-${currentArch}.dmg`))
                        else if (artifact.includes("zip")) fs.rename(artifact, path.join(outputFolder, `${appName}-MacOS-${currentArch}.zip`))
                        else if (artifact.includes("msi")) fs.rename(artifact, path.join(outputFolder, `${appName}-Windows-${currentArch}.msi`))
                    }
                }
            }
        }
    }
}
