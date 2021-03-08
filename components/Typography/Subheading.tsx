import * as React from "react";
import { Text, TextStyle, StyleProp } from "react-native";
import styled from "styled-components/native";
import { ThemeContext } from "styled-components";

import StyledText from "./StyledText";

const DefaultSubheading = styled(StyledText)`
    font-size: 16px;
    line-height: 24px;
    margin-vertical: 2px;
    letter-spacing: 0.5px;
`;

type Props = React.ComponentProps<typeof Text> & {
    style?: StyleProp<TextStyle>;
    children: React.ReactNode;
};

const Subheading = (props: Props) => {
    const theme = React.useContext(ThemeContext);

    return (
        <DefaultSubheading
            {...props}
            theme={theme}
            alpha={0.87}
            family="regular"
        />
    );
};

export default Subheading;
