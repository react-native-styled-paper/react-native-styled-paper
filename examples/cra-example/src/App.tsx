import React from 'react';
import { ThemeProvider } from "styled-components";
import { LightTheme, Text } from "react-native-styled-paper";
import logo from './logo.svg';
import './App.css';

function App() {
    return (
        <ThemeProvider theme={LightTheme}>
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Edit <code>src/App.tsx</code> and save to reload.
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                    <Text theme={LightTheme}>Hello</Text>
                </header>
            </div>
        </ThemeProvider>
    );
}

export default App;
