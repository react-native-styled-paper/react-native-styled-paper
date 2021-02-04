import * as React from 'react';
import { View } from "react-native";
import { storiesOf } from '@storybook/react-native';
import { withKnobs } from '@storybook/addon-knobs';
import { Icon } from 'react-native-styled-paper/components/Icon';

import AccountIcon from "@mdi/svg/svg/account.svg";
import ClockIcon from "@mdi/svg/svg/clock.svg";

storiesOf('Icon', module)
    .addDecorator(withKnobs)
    .add('Default', () => {

        return (
            <View>
                <Icon
                    icon={AccountIcon}
                />
                <Icon
                    icon={ClockIcon}
                />
            </View>
        )
    })
