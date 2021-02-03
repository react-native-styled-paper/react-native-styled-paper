import React from 'react';
import { Text } from "react-native";
import { storiesOf } from '@storybook/react';
import { TouchableRipple } from 'react-native-styled-paper/components/TouchableRipple';

storiesOf('TouchableRipple', module).add('Default', () => (
    <TouchableRipple
        onPress={() => console.log('Pressed')}
        rippleColor="rgba(0, 0, 0, .32)"
    >
        <Text>Text</Text>
    </TouchableRipple>
));
