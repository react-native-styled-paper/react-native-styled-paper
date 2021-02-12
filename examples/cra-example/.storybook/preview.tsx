import React from 'react';
import { addDecorator } from '@storybook/react';
import { default as PaperProviver } from 'react-native-styled-paper/components/theme/Provider';
import LightTheme from 'react-native-styled-paper/components/theme/LightTheme';
import { ToastProvider } from 'react-native-styled-paper/components/Toast';

const StoryBookUI = ({ children }) => (
    <PaperProviver theme={LightTheme}>
        <ToastProvider>
            {children}
        </ToastProvider>
    </PaperProviver>
);

addDecorator(storyFn => <StoryBookUI>{storyFn()}</StoryBookUI>);
