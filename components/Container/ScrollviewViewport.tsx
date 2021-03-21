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
        <Viewport>
            <DefaultScrollview
                height={height}
                {...rest}
            >
                {children}
            </DefaultScrollview>
        </Viewport>
    );
}

export default ScrollviewViewport;
