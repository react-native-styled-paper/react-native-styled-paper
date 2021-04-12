import * as React from "react";
import { useWindowDimensions } from "react-native";
import styled from "styled-components/native";
import { layout, LayoutProps } from "styled-system";
import Viewport from "./Viewport";

const DefaultScrollview = styled.ScrollView<LayoutProps>(
    layout,
);

function ScrollviewViewport(props) {
    const { height } = useWindowDimensions();
    const {
        children,
        ...rest
    } = props;

    return (
        <Viewport {...rest}>
            <DefaultScrollview
                height={height}
            >
                {children}
            </DefaultScrollview>
        </Viewport>
    );
}

export default ScrollviewViewport;
