import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";
import StyledText from "./StyledText";

const DefaultTitle = styled(StyledText)`
    font-size: 20;
    line-height: 30;
    margin-vertical: 2;
    letter-spacing: 0.15;
`;

type Props = React.ComponentProps<typeof Text> & {
    children: React.ReactNode;
};

const Title = (props: Props) => (
    <DefaultTitle
        {...props}
        alpha={0.87}
        family="medium"
    />
);

export default Title;
