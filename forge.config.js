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
                if (Array.isArray(options)) {
                    for (var i = 0; i < options.length; i++) {
                        console.log(options[i]["arch"])
                        for (var artifact = 0; artifact < options[i]["artifacts"].length; artifact++) {
                            if (options[i]["artifacts"][artifact].includes("deb")) {
                                if (options[i]["artifacts"][artifact].includes("x64")) {
                                    console.log("Linux Deb x64 Build Completed")
                                    fs.rename(options[i]["artifacts"][artifact], path.join("./Build-Artifacts", "simple-to-do-app-Linux-x64.deb"), function(err) {
                                        if (err) console.log('ERROR: ' + err);
                                    });
                                } else if (options[i]["artifacts"][artifact].includes("arm64")) {
                                    console.log("Linux Deb arm64 Build Completed")
                                    fs.rename(options[i]["artifacts"][artifact], path.join("./Build-Artifacts", "simple-to-do-app-Linux-arm64.deb"), function(err) {
                                        if (err) console.log('ERROR: ' + err);
                                    });
                                }
                            } else if (options[i]["artifacts"][artifact].includes("rpm")) {
                                if (options[i]["artifacts"][artifact].includes("x64")) {
                                    console.log("Linux Rpm x64 Build Completed")
                                    fs.rename(options[i]["artifacts"][artifact], path.join("./Build-Artifacts", "simple-to-do-app-Linux-x64.rpm"), function(err) {
                                        if (err) console.log('ERROR: ' + err);
                                    });
                                } else if (options[i]["artifacts"][artifact].includes("arm64")) {
                                    console.log("Linux Rpm arm64 Build Completed")
                                    fs.rename(options[i]["artifacts"][artifact], path.join("./Build-Artifacts", "simple-to-do-app-Linux-arm64.rpm"), function(err) {
                                        if (err) console.log('ERROR: ' + err);
                                    });
                                }
                            } else if (options[i]["artifacts"][artifact].includes("dmg")) {
                                var dmgFiles = 0;
                                fs.readdir("./Build-Artifacts", (err, files) => {
                                    for (var i = 0; i < files.length; i++) {
                                        if (files[i].includes(".dmg")) { 
                                            dmgFiles+=1; 
                                        }
                                    }
                                });  
                                if (options[i]["arch"] == "x64") {
                                    console.log("MacOS DMG x64 Build Completed")
                                    fs.rename(options[i]["artifacts"][artifact], path.join("./Build-Artifacts", "simple-to-do-app-MacOS-x64.dmg"), function(err) {
                                        if (err) console.log('ERROR: ' + err);
                                    });
                                } else {
                                    console.log("MacOS DMG arm64 Build Completed")
                                    fs.rename(options[i]["artifacts"][artifact], path.join("./Build-Artifacts", "simple-to-do-app-MacOS-arm64.dmg"), function(err) {
                                        if (err) console.log('ERROR: ' + err);
                                    });
                                }
                            } else if (options[i]["artifacts"][artifact].includes("zip")) {
                                if (options[i]["artifacts"][artifact].includes("x64")) {
                                    console.log("MacOS Zip x64 Build Completed")
                                    fs.rename(options[i]["artifacts"][artifact], path.join("./Build-Artifacts", "simple-to-do-app-MacOS-x64.zip"), function(err) {
                                        if (err) console.log('ERROR: ' + err);
                                    });
                                } else if (options[i]["artifacts"][artifact].includes("arm64")) {
                                    console.log("MacOS Zip arm64 zip Build Completed")
                                    fs.rename(options[i]["artifacts"][artifact], path.join("./Build-Artifacts", "simple-to-do-app-MacOS-arm64.zip"), function(err) {
                                        if (err) console.log('ERROR: ' + err);
                                    });
                                }
                            }  else if (options[i]["artifacts"][artifact].includes("msi")) {
                                if (options[i]["artifacts"][artifact].includes("x64")) {
                                    console.log("Windows MSI x64 Build Completed")
                                    if (process.env.CURRENT_WORKFLOW === "Publish") {
                                        fs.rename(options[i]["artifacts"][artifact], path.join("./Build-Artifacts", "simple-to-do-app-Windows-x64.msi"), function(err) {
                                            if (err) console.log('ERROR: ' + err);
                                        });
                                    }
                                } else if (options[i]["artifacts"][artifact].includes("arm64")) {
                                    console.log("Windows MSI arm64 Build Completed")
                                    if (process.env.CURRENT_WORKFLOW === "Publish") {
                                        fs.rename(options[i]["artifacts"][artifact], path.join("./Build-Artifacts", "simple-to-do-app-Windows-arm64.msi"), function(err) {
                                            if (err) console.log('ERROR: ' + err);
                                        });
                                    }
                                } else if (options[i]["artifacts"][artifact].includes("ia32")) {
                                    console.log("Windows MSI x86 Build Completed")
                                    if (process.env.CURRENT_WORKFLOW === "Publish") {
                                        fs.rename(options[i]["artifacts"][artifact], path.join("./Build-Artifacts", "simple-to-do-app-Windows-x86.msi"), function(err) {
                                            if (err) console.log('ERROR: ' + err);
                                        });
                                    }
                                }
                            }
                            console.log("Artifacts:", options[i]["artifacts"][artifact]);
                            if (process.env.CURRENT_WORKFLOW === "Publish") {
                                console.log("Publish Workflow")
                            }
                        }
                    }
                }
            }
        }
    }
}
