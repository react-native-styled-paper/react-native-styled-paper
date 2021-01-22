import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { number, text } from '@storybook/addon-knobs';
import { LightTheme, Text } from 'react-native-styled-paper';

storiesOf('Activity Indicator', module).add('Default', () => (
  <Text
    theme={LightTheme}
  />
));
