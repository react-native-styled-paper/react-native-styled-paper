import * as React from "react";
import { Platform } from "react-native";
// import { I18nManager, Platform } from "react-native";
import {ThemeProvider} from "styled-components";
import { LightTheme } from "react-native-styled-paper";
import Head from "next/head";

// const PERSISTENCE_KEY = "NAVIGATION_STATE";
// const PREFERENCES_KEY = "APP_PREFERENCES";

// const CustomDarkTheme = {
//     ...DarkTheme,
//     colors: {
//         ...DarkTheme.colors,
//         customColor: "#BADA55",
//     },
//     fonts: {
//         ...DarkTheme.fonts,
//         superLight: { ...DarkTheme.fonts["light"] },
//     },
//     userDefinedThemeProperty: "",
//     animation: {
//         ...DarkTheme.animation,
//         customProperty: 1,
//     },
// };

const CustomDefaultTheme = {
    colors: {
        customColor: "#BADA55",
    },
    fonts: {
    },
    userDefinedThemeProperty: "",
    animation: {
        customProperty: 1,
    },
};

// const PreferencesContext = React.createContext(null);

export default function App({ Component, pageProps }) {
    const [theme] = React.useState(CustomDefaultTheme);
    // const [rtl, setRtl] = React.useState(I18nManager.isRTL);

    // const preferences = React.useMemo(
    //     () => ({
    //         toggleTheme: () =>
    //             setTheme((theme) =>
    //                 theme === CustomDefaultTheme
    //                     ? CustomDarkTheme
    //                     : CustomDefaultTheme
    //             ),
    //         toggleRtl: () => setRtl((rtl) => !rtl),
    //         rtl,
    //         theme,
    //     }),
    //     [rtl, theme]
    // );

    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                {Platform.OS === "web" ? (
                    <style type="text/css">{`
                        @font-face {
                            font-family: 'MaterialCommunityIcons';
                            src: url(${require("react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf")}) format('truetype');
                        }
                    `}</style>
                ) : null}
            </Head>
            <ThemeProvider theme={LightTheme}>
                <Component {...pageProps} />
            </ThemeProvider>
        </>
    );
}
