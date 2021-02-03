module.exports = {
    stories: ['../components/**/*.stories.tsx'],
    addons: [
        '@storybook/preset-create-react-app',
        '@storybook/addon-actions/register',
        '@storybook/addon-links/register',
        '@storybook/addon-knobs/register',
    ],
    webpackFinal: async (config) => {
        config.module.rules.push({
            test: /\.(js|ts|tsx)$/,
            exclude: /(node_modules\/(?!(@airasia-common)\/).*|dist|.storybook)/,
            use: ['babel-loader'],
        });

        // config.resolve.alias = {
        //     ...(config.resolve.alias || {}),
        //     // Transform all direct `react-native` imports to `react-native-web`
        //     "react-native$": "react-native-web",
        //     "react-native-vector-icons": "@ovaeasy/react-native-vector-icons",
        // };

        const nodeConfig = config.node || {};
        nodeConfig.fs = "empty";
        config.node = nodeConfig;

        // Return the altered config
        return config;
    },
};
