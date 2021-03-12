import * as React from "react";
import { Button } from "react-native-styled-paper/components/Button";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from "src/types";
import { ToastExample } from "src/components/Toast/ToastExample";
import MinusBoxIcon from "@mdi/svg/svg/minus-box.svg";
import { ScrollView } from "react-native";
import { Card } from "react-native-styled-paper/components/Card";

const testData = [
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
];

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
        <>
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
            <ScrollView
                onScroll={(evt) => {
                    console.log("Scroll: " + JSON.stringify(evt));
                }}
                style={{
                    height: "700px"
                }}
                testID="scrollview_1"
            >
                {(Array.isArray(testData) && testData.length > 0) &&
                    testData.map((item, index) => {
                        return (
                            <Card
                                key={index}
                            >
                                {index}
                            </Card>
                        )
                    })
                }
            </ScrollView>
        </>
    )
}
