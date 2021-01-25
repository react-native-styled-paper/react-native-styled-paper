import React from 'react';
import { Text } from "react-native";
import { storiesOf } from '@storybook/react';
import { LightTheme, Surface } from 'react-native-styled-paper';

storiesOf('Surface', module).add('Default', () => (
    <Surface
        theme={LightTheme}
    >
        <Text>Text</Text>
    </Surface>
));
