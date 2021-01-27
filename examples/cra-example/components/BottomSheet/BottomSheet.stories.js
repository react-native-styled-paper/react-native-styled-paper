import React, { createRef } from 'react';
import { Button, Text, View } from "react-native";
import { storiesOf } from '@storybook/react';
import { BottomSheet } from 'react-native-styled-paper';

storiesOf('BottomSheet', module).add('Default', () => {
    const _standardRef = createRef();

    return (
        <View>
            <Button
                title={"Open"}
                onPress={() => _standardRef.current.open()}
            />
            <BottomSheet
                ref={_standardRef}
                height={330}
            >
                <Text>Text</Text>
            </BottomSheet>
        </View>
    )
});
