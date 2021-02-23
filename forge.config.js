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
    publishers: [
        {
            "name": "@electron-forge/publisher-github",
            "config": {
                "authToken": process.env.GITHUB_TOKEN,
                "repository": {
                    "owner": "kethan1",
                    "name": "Simple-To-Do-App",
                    "draft": true
                }
            }
        }
    ],
    hooks: {
        postMake: async (forgeConfig, options) => {
            if (Array.isArray(options)) {
                for (var i = 0; i < options.length; i++) {
                    for (var artifact = 0; artifact < options[i]["artifacts"].length; artifact++) {
                        console.log(options[i]["artifacts"][artifact])
                        if (options[i]["artifacts"][artifact].includes("deb")) {
                            if (options[i]["artifacts"][artifact].includes("x64")) {
                                console.log("x64 deb build completed")
                                console.log(options[i]["artifacts"][artifact])
                            } else if (options[i]["artifacts"][artifact].includes("arm64")) {
                                console.log("arm64 deb build completed")
                                console.log(options[i]["artifacts"][artifact])
                            }
                        } else if (options[i]["artifacts"][artifact].includes("rpm")) {
                            if (options[i]["artifacts"][artifact].includes("x64")) {
                                console.log("x64 rpm build completed")
                                console.log(options[i]["artifacts"][artifact])
                            } else if (options[i]["artifacts"][artifact].includes("arm64")) {
                                console.log("arm64 rpm build completed")
                                console.log(options[i]["artifacts"][artifact])
                            }
                        } else if (options[i]["artifacts"][artifact].includes("dmg")) {
                            var dmgFiles = 0;
                            fs.readdir(dir, (err, files) => {
                                console.log(files, files.length)
                                for (var i = 0; i < files.length; i++) {
                                    if (files[i].includes(".dmg")) {
                                        dmgFiles+=1;
                                    }
                                }
                            });  
                            if (dmgFiles == 1) {
                                console.log("x64 dmg build completed")
                                console.log(options[i]["artifacts"][artifact])
                            } else {
                                console.log("arm64 dmg build completed")
                                console.log(options[i]["artifacts"][artifact])
                            }
                        } else if (options[i]["artifacts"][artifact].includes("zip")) {
                            if (options[i]["artifacts"][artifact].includes("x64")) {
                                console.log("x64 zip build completed")
                                console.log(options[i]["artifacts"][artifact])
                            } else if (options[i]["artifacts"][artifact].includes("arm64")) {
                                console.log("arm64 zip build completed")
                                console.log(options[i]["artifacts"][artifact])
                            }
                        }
                    }
                }
            }
        }
    }
}
