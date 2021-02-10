import * as React from "react";
import { Button } from "react-native-styled-paper/components/Button";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from "src/types";
import { ToastExample } from "src/components/Toast/ToastExample";
import MinusBoxIcon from "@mdi/svg/svg/minus-box.svg";

type ProfileScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Home'
>;

type Props = {
    navigation: ProfileScreenNavigationProp;
};

export function HomePage(props: Props) {

    const {
        navigation,
    } = props;

    return (
        <div>
            <MinusBoxIcon />
            Hello from HomePage
            <Button
                onPress={() => {
                    navigation.navigate("Profile", {
                        id: "123",
                    })
                }}
            >
                Go to Profile
            </Button>
            <ToastExample
            />
        </div>
    )
}
