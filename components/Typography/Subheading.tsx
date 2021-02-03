import * as React from "react";
import { Text, TextStyle, StyleProp } from "react-native";
import styled from "styled-components/native";

import StyledText from "./StyledText";

const DefaultSubheading = styled(StyledText)`
    font-size: 16;
    line-height: 24;
    margin-vertical: 2;
    letter-spacing: 0.5;
`;

type Props = React.ComponentProps<typeof Text> & {
    style?: StyleProp<TextStyle>;
    children: React.ReactNode;
};

const Subheading = (props: Props) => (
    <DefaultSubheading
        {...props}
        alpha={0.87}
        family="regular"
    />
);

export default Subheading;
