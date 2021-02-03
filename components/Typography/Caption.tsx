import * as React from "react";
import { Text, TextStyle, StyleProp } from "react-native";
import styled from "styled-components/native";
import StyledText from "./StyledText";

const DefaultCaption = styled(StyledText)`
    font-size: 12;
    line-height: 20;
    margin-vertical: 2;
    letter-spacing: 0.4;
`;

type Props = React.ComponentProps<typeof Text> & {
    style?: StyleProp<TextStyle>;
    children: React.ReactNode;
};

const Caption = (props: Props) => (
    <DefaultCaption
        {...props}
        alpha={0.54}
        family="regular"
    />
);

export default Caption;
