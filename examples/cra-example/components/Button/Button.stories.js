import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { Button } from 'react-native-styled-paper';

const onPressFn = action("onPress");

storiesOf('Button', module)
    .addDecorator(withKnobs)
    .add('Default', () => {
        const title = text("title", "Text");
        return (
        <Button
            onPress={onPressFn}
        >
            {title}
        </Button>
        )
    });
