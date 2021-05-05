import * as React from "react";
import { Text, TextStyle, StyleProp } from "react-native";
import styled from "styled-components/native";
import { ThemeContext } from "styled-components";

import StyledText from "./StyledText";

const DefaultHeadline = styled(StyledText)`
    font-size: 24px;
    line-height: 32px;
    margin-vertical: 2px;
    letter-spacing: 0px;
`;

type Props = React.ComponentProps<typeof Text> & {
    style?: StyleProp<TextStyle>;
    children: React.ReactNode;
};

const Headline = (props: Props) => {

    const theme = React.useContext(ThemeContext);

    return (
        <DefaultHeadline
            {...props}
            theme={theme}
            alpha={0.87}
            family="regular"
        />
    );
};

export default Headline;
