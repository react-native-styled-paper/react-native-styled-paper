import * as React from 'react';
import { storiesOf } from '@storybook/react-native';
import { withKnobs } from '@storybook/addon-knobs';
import { Icon } from 'react-native-styled-paper/components/Icon';

import AccountIcon from "@mdi/svg/svg/account.svg";

storiesOf('Icon', module)
    .addDecorator(withKnobs)
    .add('Default', () => {

        return (
            <Icon
                icon={AccountIcon}
            />
        )
    })
