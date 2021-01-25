import React from 'react';
import { ThemeProvider } from 'styled-components';
import { addDecorator } from '@storybook/react';
import { LightTheme } from 'react-native-styled-paper';

const StoryBookUI = ({ children }) => (
    <ThemeProvider theme={LightTheme}>
        {children}
    </ThemeProvider>
);

addDecorator(storyFn => <StoryBookUI>{storyFn()}</StoryBookUI>);
