import * as React from "react";
import styled from "styled-components";
import nativeStyled from "styled-components/native";
import { Text } from "react-native-styled-paper/components/Typography";
import { Appbar } from "widgets/Appbar/Appbar";
import * as Avatar from "react-native-styled-paper/components/Avatar";
import FolderIcon from "@mdi/svg/svg/folder.svg";
import { Button } from "react-native-styled-paper/components/Button";
import { useRouter } from 'next/router';
import { LeftNav } from "widgets/LeftNav";
import { View, ScrollView } from "react-native";
import { compose, layout, LayoutProps, space, SpaceProps } from "styled-system";

const Title = styled.h1`
  color: red;
  font-size: 50px;
`;

const Container = styled.div<LayoutProps & SpaceProps>({
}, compose(layout, space));

Container.defaultProps = {
    height: "100%",
}

const ViewportScrollView = nativeStyled(ScrollView)<SpaceProps>({

}, compose(space));

function Home() {
    const router = useRouter();

    return (
        <>
            <Appbar>
            </Appbar>
            <LeftNav
            />
            <Container
                paddingLeft={[ "0", "240px" ]}
            >
                <ViewportScrollView>
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
                </ViewportScrollView>
            </Container>
        </>
    );
}

export default Home;
