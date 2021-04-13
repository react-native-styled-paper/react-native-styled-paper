
import * as React from "react";
import { AccessibilityInfo, Appearance, ColorSchemeName } from "react-native";
import { DefaultTheme, ThemeProvider } from "styled-components";
import { Provider as SettingsProvider, Settings } from "./settings";
import PortalHost from "../Portal/PortalHost";
import LightTheme from "./LightTheme";
import DarkTheme from "./DarkTheme";

type Props = {
    children: React.ReactNode;
    theme?: DefaultTheme;
    settings?: Settings;
};

const Provider = ({ ...props }: Props) => {
    const colorSchemeName =
        (!props.theme && Appearance?.getColorScheme()) || "light";

    const [reduceMotionEnabled, setReduceMotionEnabled] = React.useState<boolean>(
        false
    );
    const [colorScheme, setColorScheme] = React.useState<ColorSchemeName>(
        colorSchemeName
    );

    const handleAppearanceChange = (
        preferences: Appearance.AppearancePreferences
    ) => {
        const { colorScheme } = preferences;
        setColorScheme(colorScheme);
    };

    React.useEffect(() => {
        if (!props.theme) {
            AccessibilityInfo.addEventListener(
                "reduceMotionChanged",
                setReduceMotionEnabled
            );
        }
        return () => {
            if (!props.theme) {
                AccessibilityInfo.removeEventListener(
                    "reduceMotionChanged",
                    setReduceMotionEnabled
                );
            }
        };
    }, [props.theme]);

    React.useEffect(() => {
        if (!props.theme) Appearance?.addChangeListener(handleAppearanceChange);
        return () => {
            if (!props.theme)
                Appearance?.removeChangeListener(handleAppearanceChange);
        };
    }, [props.theme]);

    const getTheme = () => {
        const { theme: providedTheme } = props;

        if (providedTheme) {
            return providedTheme;
        } else {
            const theme = (colorScheme === "dark"
                ? DarkTheme
                : LightTheme) as DefaultTheme;

            return {
                ...theme,
                animation: {
                    ...theme.animation,
                    scale: reduceMotionEnabled ? 0 : 1,
                },
            };
        }
    };

    const { children, settings } = props;
    return (
        <PortalHost>
            <SettingsProvider value={settings || { }}>
                {/* <ThemeProvider theme={getTheme()}> */}
                {children}
                {/* </ThemeProvider> */}
            </SettingsProvider>
        </PortalHost>
    );
};

export default Provider;
