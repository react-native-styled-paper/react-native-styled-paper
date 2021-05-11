import * as React from "react";
import styled from "styled-components";
import { Text } from "react-native-styled-paper/components/Typography";
import * as Avatar from "react-native-styled-paper/components/Avatar";
import FolderIcon from "@mdi/svg/svg/folder.svg";
import { Button } from "react-native-styled-paper/components/Button";
import { useRouter } from "next/router";
import Layout from "components/layout";
import { IconButton } from "react-native-styled-paper/components/IconButton";
import Image from "react-native-styled-paper/components/Image/Image";
import ImageButton from "react-native-styled-paper/components/ImageButton";
import SegmentedControl from '@react-native-community/segmented-control';

const Title = styled.h1`
  color: red;
  font-size: 50px;
`;

function Home() {
    const router = useRouter();
    const [ selectedSegmentIndex, setSelectedSegmentIndex ] = React.useState(-1);

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
            <Image
                source={{ uri: "https://via.placeholder.com/350x150.png" }}
                style={{ width: "300px", height: "150px" }}
            />
            <ImageButton
                source={{ uri: "https://via.placeholder.com/350x150.png" }}
                size={300}
                onPress={() => alert("Hello")}
            />
            <SegmentedControl
                values={['One', 'Two']}
                selectedIndex={selectedSegmentIndex}
                onChange={(event) => {
                    setSelectedSegmentIndex(event.nativeEvent.selectedSegmentIndex);
                }}
            />
        </Layout>
    );
}

export default Home;
