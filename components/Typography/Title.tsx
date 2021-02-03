import * as React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";
import StyledText from "./StyledText";
import { ThemeContext } from "styled-components";

const DefaultTitle = styled(StyledText)`
    font-size: 20px;
    line-height: 30px;
    margin-vertical: 2px;
    letter-spacing: 0.15px;
`;

type Props = React.ComponentProps<typeof Text> & {
    children: React.ReactNode;
};

const Title = (props: Props) => {
    const theme = React.useContext(ThemeContext);

    return (
        <DefaultTitle
            {...props}
            theme={theme}
            alpha={0.87}
            family="medium"
        />
    );
}

export default Title;
