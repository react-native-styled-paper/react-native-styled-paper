import * as React from "react";
import { TextProps } from "react-native";
import styled from "styled-components/native";
import { ThemeContext } from "styled-components";
import StyledText from "./StyledText";

const DefaultParagraph = styled(StyledText)`
    font-size: 14px;
    line-height: 20px;
    margin-vertical: 2px;
    letter-spacing: 0.25px;
`;

type Props = TextProps & {
    children: React.ReactNode;
};

const Paragraph = (props: Props) => {
    const theme = React.useContext(ThemeContext);

    return (
        <DefaultParagraph
            {...props}
            theme={theme}
            alpha={0.87}
            family="regular"
        />
    );
}

export default Paragraph;
