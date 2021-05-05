import * as React from "react";
import styled from "styled-components";
import { Text } from "react-native-styled-paper/components/Typography";
import * as Avatar from "react-native-styled-paper/components/Avatar";
import FolderIcon from "@mdi/svg/svg/folder.svg";
import { Button } from "react-native-styled-paper/components/Button";
import { useRouter } from "next/router";
import Layout from "components/layout";
import { IconButton } from "react-native-styled-paper/components/IconButton";

const Title = styled.h1`
  color: red;
  font-size: 50px;
`;

function Home() {
    const router = useRouter();

    return (
        <Layout>
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
            <IconButton
                icon={FolderIcon}
                // color={Colors.red500}
                size={20}
                onPress={() => console.info("Pressed")}
            />
            <Button
                onPress={() => {
                    router.push("/profile");
                }}
            >
                Go to profile
            </Button>
        </Layout>
    );
}

export default Home;
