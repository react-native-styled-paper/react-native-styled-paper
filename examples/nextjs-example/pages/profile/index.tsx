import * as React from "react";
import { ScrollView } from "react-native"
import { Button, Text } from "react-native-styled-paper";
import { useRouter } from "next/router";

export default function ProfilePage(props) {

    const router = useRouter();

    return (
        <>
            <ScrollView>
                <Text>Profile Page</Text>
                <Button
                    onPress={() => {
                        router.back();
                    }}
                >
                    Go Back
                </Button>
            </ScrollView>
        </>
    )
}
