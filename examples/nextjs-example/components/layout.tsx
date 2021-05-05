import * as React from "react";
import styled from "styled-components";
import { ScrollView } from "react-native";
import { compose, layout, LayoutProps, space, SpaceProps } from "styled-system";
import { Appbar } from "widgets/Appbar/Appbar";
import { LeftNav } from "widgets/LeftNav";
import { ProfileDropdown } from "widgets/ProfileDropdown";

const Container = styled.div<LayoutProps & SpaceProps>({
}, compose(layout, space));

Container.defaultProps = {
    height: "100%",
};

const ViewportScrollView = styled(ScrollView)<SpaceProps>({

}, compose(space));

type Props = {
    children?: React.ReactNode,
};

function Layout(props: Props) {
    const {
        children,
    } = props;

    return (
        <>
            <Appbar>
                <ProfileDropdown
                />
            </Appbar>
            <LeftNav
            />
            <Container
                paddingLeft={[ "0", "240px" ]}
            >
                <ViewportScrollView>{children}</ViewportScrollView>
            </Container>
        </>
    );
}

export default Layout;
