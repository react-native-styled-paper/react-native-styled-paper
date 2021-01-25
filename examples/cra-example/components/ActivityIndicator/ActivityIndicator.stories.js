import React from 'react';
import { Text } from "react-native";
import { storiesOf } from '@storybook/react';
import { Colors, LightTheme, ActivityIndicator } from 'react-native-styled-paper';

storiesOf('ActivityIndicator', module).add('Default', () => (
    <ActivityIndicator
        theme={LightTheme}
        animating={true} color={Colors.red800}
    >
        <Text>Text</Text>
    </ActivityIndicator>
));
