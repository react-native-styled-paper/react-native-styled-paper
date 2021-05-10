import * as React from "react";
import styled from "styled-components";
import { ScrollView, useWindowDimensions } from "react-native";
import { compose, layout, LayoutProps, space, SpaceProps } from "styled-system";
import { Appbar } from "widgets/Appbar/Appbar";
import { LeftNav } from "widgets/LeftNav";
import { ProfileDropdown } from "widgets/ProfileDropdown";
import { Viewport } from "react-native-styled-paper/components/Container";

const PageContainer = styled.div<LayoutProps & SpaceProps>({
    maxWidth: "100%",
    flex: 1,
    overflowY: "auto",
}, compose(layout, space));

PageContainer.defaultProps = {
    height: "100vh",
};

type Props = {
    children?: React.ReactNode,
};

function Layout(props: Props) {

    const { height } = useWindowDimensions();

    const {
        children,
    } = props;

    return (
        <Viewport>
            <Appbar>
                <ProfileDropdown
                />
            </Appbar>
            <LeftNav
            />
            <PageContainer
                data-testid="RNSP__viewport_container"
                height={height}
                paddingLeft={[ "0", "240px" ]}
            >
                <ScrollView>{children}</ScrollView>
            </PageContainer>
        </Viewport>
    );
}

export default Layout;
