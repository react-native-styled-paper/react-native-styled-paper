import * as ReactJS from "react";
import { Platform } from "react-native";
// import { I18nManager, Platform } from "react-native";
import {ThemeProvider} from "styled-components";
import LightTheme from "react-native-styled-paper/components/theme/LightTheme";
import Head from "next/head";
import type { AppProps /*, AppContext */ } from 'next/app';

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

// const CustomDefaultTheme = {
//     colors: {
//         customColor: "#BADA55",
//     },
//     fonts: {
//     },
//     userDefinedThemeProperty: "",
//     animation: {
//         customProperty: 1,
//     },
// };

// const PreferencesContext = React.createContext(null);

const App =({ Component, pageProps }: AppProps) => {

    // const [theme] = React.useState(CustomDefaultTheme);
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
        <ReactJS.Fragment>
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
        </ReactJS.Fragment>
    );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default App;
