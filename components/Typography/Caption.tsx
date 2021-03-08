import * as React from "react";
import { Text, TextStyle, StyleProp } from "react-native";
import styled from "styled-components/native";
import { ThemeContext } from "styled-components";

import StyledText from "./StyledText";

const DefaultCaption = styled(StyledText)`
    font-size: 12px;
    line-height: 20px;
    margin-vertical: 2px;
    letter-spacing: 0.4px;
`;

type Props = React.ComponentProps<typeof Text> & {
    style?: StyleProp<TextStyle>;
    children: React.ReactNode;
};

const Caption = (props: Props) => {
    const theme = React.useContext(ThemeContext);

    return (
        <DefaultCaption
            {...props}
            theme={theme}
            alpha={0.54}
            family="regular"
        />
    );
};

export default Caption;
