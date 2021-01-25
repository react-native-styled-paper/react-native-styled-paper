import React from 'react';
import { storiesOf } from '@storybook/react';
import { LightTheme, Text } from 'react-native-styled-paper';

storiesOf('Text', module).add('Default', () => (
    <Text
        theme={LightTheme}
    >
        Text
    </Text>
));
