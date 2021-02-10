import React from 'react';
import { ThemeProvider } from 'styled-components';
import { addDecorator } from '@storybook/react';
import LightTheme from 'react-native-styled-paper/components/theme/LightTheme';
import { ToastProvider } from 'react-native-styled-paper/components/Toast';

const StoryBookUI = ({ children }) => (
    <ThemeProvider theme={LightTheme}>
        <ToastProvider>
            {children}
        </ToastProvider>
    </ThemeProvider>
);

addDecorator(storyFn => <StoryBookUI>{storyFn()}</StoryBookUI>);
