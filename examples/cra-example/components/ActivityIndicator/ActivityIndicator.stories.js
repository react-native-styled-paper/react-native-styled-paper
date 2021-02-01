import React from 'react';
import { Text } from "react-native";
import { storiesOf } from '@storybook/react';
import * as Colors from 'react-native-styled-paper/components/theme/colors';
import LightTheme from 'react-native-styled-paper/components/theme/LightTheme';
import { ActivityIndicator } from 'react-native-styled-paper/components/ActivityIndicator';

storiesOf('ActivityIndicator', module).add('Default', () => (
    <ActivityIndicator
        theme={LightTheme}
        animating={true} color={Colors.red800}
    >
        <Text>Text</Text>
    </ActivityIndicator>
));
