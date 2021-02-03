import * as React from "react";
import { Text, TextStyle, StyleProp } from "react-native";
import styled from "styled-components/native";

import StyledText from "./StyledText";

const DefaultHeadline = styled(StyledText)`
    font-size: 24;
    line-height: 32;
    margin-vertical: 2;
    letter-spacing: 0;
`;

type Props = React.ComponentProps<typeof Text> & {
    style?: StyleProp<TextStyle>;
    children: React.ReactNode;
};

const Headline = (props: Props) => (
    <DefaultHeadline
        {...props}
        alpha={0.87}
        family="regular"
    />
);

export default Headline;
