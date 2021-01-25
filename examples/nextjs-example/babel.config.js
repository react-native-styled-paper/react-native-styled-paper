module.exports = {
    presets: [
        "next/babel",
        "@babel/preset-react",
        "@babel/preset-typescript",
    ],
    plugins: [
        ["react-native-web", { commonjs: true }],
        ["styled-components", { "ssr": true }],
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-proposal-object-rest-spread",
        "@babel/plugin-transform-modules-commonjs",
        "inline-react-svg",
        [
            "module-resolver",
            {
                alias: {
                    "^react-native$": "react-native-web",
                    "react-native-vector-icons":
                        "@ovaeasy/react-native-vector-icons",
                    components: "./components",
                },
            },
        ],
    ],
};
