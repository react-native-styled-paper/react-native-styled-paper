import React from "react";
import { TextProps } from "react-native";
import styled from "styled-components/native";
import StyledText from "./StyledText";

const DefaultParagraph = styled(StyledText)`
    font-size: 14;
    line-height: 20;
    margin-vertical: 2;
    letter-spacing: 0.25;
`;

type Props = TextProps & {
    children: React.ReactNode;
};

const Paragraph = (props: Props) => (
    <DefaultParagraph
        {...props}
        alpha={0.87}
        family="regular"
    />
);

export default Paragraph;
