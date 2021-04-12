import * as React from "react";
import { ScrollView } from "react-native";
import styled from "styled-components";
import { Text } from "react-native-styled-paper/components/Typography";
import { Appbar } from "widgets/Appbar/Appbar";
import * as Avatar from "react-native-styled-paper/components/Avatar";
import FolderIcon from "@mdi/svg/svg/folder.svg";
import { Button } from "react-native-styled-paper/components/Button";
import { useRouter } from 'next/router';
import { LeftNav } from "widgets/LeftNav";

const Title = styled.h1`
  color: red;
  font-size: 50px;
`;

export default function Home() {
    const router = useRouter();

    return (
        <>
            <Appbar>
            </Appbar>
            <LeftNav
            />
            <ScrollView
                style={{
                    height: "800px"
                }}
            >
                <Title>My page</Title>
                <Text>Text</Text>
                <Avatar.Icon size={24} icon={FolderIcon} />
                <Button
                    onPress={() => {
                        router.push({
                            pathname: "orders"
                        });
                    }}
                >
                    Go to orders
                </Button>
                <Button
                    onPress={() => {
                        router.push(`/profile`);
                    }}
                >
                    Go to profile
                </Button>
            </ScrollView>
        </>
    );
}
