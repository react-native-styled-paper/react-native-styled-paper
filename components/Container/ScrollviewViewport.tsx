import * as React from "react";
import { useWindowDimensions } from "react-native";
import styled from "styled-components/native";
import { layout, LayoutProps, space, SpaceProps } from "styled-system";

const DefaultScrollview = styled.ScrollView<LayoutProps & SpaceProps>(
    layout,
    space,
);

DefaultScrollview.defaultProps = {
    overflowY: "scroll",
};

function ScrollviewViewport(props) {
    const { height } = useWindowDimensions();
    const {
        children,
        paddingTop,
    } = props;

    return (
        <DefaultScrollview
            height={height}
            paddingTop={paddingTop}
            style={{
                position: "absolute",
                top: 0,
                right: 0,
                left: 0,
            }}
        >
            {children}
        </DefaultScrollview>
    );
}

ScrollviewViewport.defaultProps = {
    paddingTop: 0,
};

export default ScrollviewViewport;
