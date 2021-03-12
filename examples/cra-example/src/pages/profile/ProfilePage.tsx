import * as React from "react";
import { ScrollView } from "react-native";
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from "src/types";
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

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>;

type Props = {
  route: ProfileScreenRouteProp;
};

export function ProfilePage(props: Props) {

    const {
        route,
    } = props;
    const {
        params,
    } = route;

    return (
        <>
            Hello from ProfilePage {params.id}
            <ScrollView
                scrollEnabled={true}
                onScroll={(evt) => {
                    console.log(evt);
                }}
                testID="scrollview_1"
                style={{
                    height: "700px"
                }}
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
