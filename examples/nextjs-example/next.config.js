const withPlugins = require("next-compose-plugins");
const withTM = require("next-transpile-modules")([
    // "react-native-paper",
    // "react-native-safe-area-view",
    "react-native-vector-icons",
    "react-native-styled-paper",
    "styled-components",
]);
const nextEnv = require("next-env");
const dotenvLoad = require("dotenv-load");

dotenvLoad();
const withNextEnv = nextEnv();

module.exports = withPlugins([withTM, withNextEnv], {
    webpack: (config) => {
        config.module.rules.push({
            test: /\.(jpg|png|woff|woff2|eot|ttf|svg)$/,
            loader: "file-loader",
        });
        // config.module.rules.push({
        //     test: /\.(ts|js)x?$/, // Just `tsx?` file only
        //     use: [
        //         // options.defaultLoaders.babel, I don't think it's necessary to have this loader too
        //         {
        //             loader: "ts-loader",
        //             options: {
        //                 transpileOnly: true,
        //                 experimentalWatchApi: true,
        //                 onlyCompileBundledFiles: true,
        //             },
        //         },
        //     ],
        // });

        config.resolve.alias = {
            ...(config.resolve.alias || {}),
            // Transform all direct `react-native` imports to `react-native-web`
            "react-native$": "react-native-web",
            "react-native-vector-icons": "@ovaeasy/react-native-vector-icons",
        };
        config.resolve.extensions = [
            ".web.js",
            ".web.ts",
            ".web.tsx",
            ...config.resolve.extensions,
        ];
        return config;
    },
});
