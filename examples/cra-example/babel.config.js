module.exports = {
    presets: [
        '@babel/preset-env',
        '@babel/preset-react',
    ],
    plugins: [
        '@babel/plugin-proposal-class-properties',
        'babel-plugin-styled-components',
        "@babel/plugin-transform-modules-commonjs",
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
