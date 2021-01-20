import React from "react";
import { StyleSheet, View } from "react-native";
import { LightTheme, Text } from "react-native-styled-paper";
import { ThemeProvider } from "styled-components";

export default function App() {
    return (
        <ThemeProvider theme={LightTheme}>
            <View style={styles.container}>
                <Text theme={LightTheme}>Open up App.tsx to start working on your app! H</Text>
            </View>
        </ThemeProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
