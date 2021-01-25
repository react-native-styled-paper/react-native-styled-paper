import React from 'react';
import { Text } from "react-native";
import { storiesOf } from '@storybook/react';
import { LightTheme, TouchableRipple } from 'react-native-styled-paper';

storiesOf('TouchableRipple', module).add('Default', () => (
    <TouchableRipple
        theme={LightTheme}
        onPress={() => console.log('Pressed')}
        rippleColor="rgba(0, 0, 0, .32)"
    >
        <Text>Text</Text>
    </TouchableRipple>
));
