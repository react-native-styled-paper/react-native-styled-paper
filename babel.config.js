module.exports = {
    presets: [
        // "@babel/preset-env",
        "module:metro-react-native-babel-preset",
        "@babel/preset-typescript",
    ],
    plugins: [
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-transform-runtime",
        [
            "module-resolver",
            {
                alias: {
                    components: "./components",
                },
            },
        ],
    ],
};
