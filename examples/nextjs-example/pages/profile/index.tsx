import * as React from "react";
import { Appbar } from "widgets/Appbar/Appbar";
import { LeftNav } from "widgets/LeftNav";
import { Button } from "react-native-styled-paper/components/Button";
import { Text } from "react-native-styled-paper/components/Typography";
import { useRouter } from "next/router";
import CustomViewport from "widgets/CustomViewport/CustomViewport";

export default function ProfilePage(props) {

    const router = useRouter();

    return (
        <>
            <Appbar>
            </Appbar>
            <LeftNav
            />
            <CustomViewport>
                <Text>Profile Page</Text>
                <Button
                    onPress={() => {
                        router.back();
                    }}
                >
                    Go Back
                </Button>
            </CustomViewport>
        </>
    )
}
