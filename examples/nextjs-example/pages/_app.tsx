import * as React from "react";
import { Platform } from "react-native";
import { Provider } from "react-redux";
// import { I18nManager, Platform } from "react-native";
import { default as PaperProviver } from 'react-native-styled-paper/components/theme/Provider';
import LightTheme from "react-native-styled-paper/components/theme/LightTheme";
import Head from "next/head";
import type { AppProps /*, AppContext */ } from 'next/app';
import { Viewport } from "react-native-styled-paper/components/Container";
import { useStore } from "../store";
import { createGlobalStyle, ThemeProvider as StyledProvider } from "styled-components";
import { useRouter } from "next/router";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`

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

const theme = {
    ...LightTheme,
    // breakpoints: ['40em', '52em', '64em'],
}

const App =({ Component, pageProps }: AppProps) => {
    const router = useRouter();
    const store = useStore(pageProps.initialReduxState);
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

    React.useEffect(() => {
        const handleRouteChange = (url, opts) => {
            console.log(
              `App is changing to ${url} ${
                opts?.shallow ? 'with' : 'without'
              } shallow routing`
            )
          }

          router.events.on('routeChangeStart', handleRouteChange)

          // If the component is unmounted, unsubscribe
          // from the event with the `off` method:
          return () => {
            router.events.off('routeChangeStart', handleRouteChange)
          }
    }, [])

    return (
        <Provider store={store}>
            <GlobalStyle />
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
            <PaperProviver>
                <StyledProvider theme={theme}>
                    <Viewport>
                        <Component {...pageProps} />
                    </Viewport>
                </StyledProvider>
            </PaperProviver>
        </Provider>
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
