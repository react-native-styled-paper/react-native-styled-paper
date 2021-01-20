import color from "color";
import React from "react";
import { I18nManager, StyleProp, TextStyle } from "react-native";
import { DefaultTheme } from "styled-components";
import styled from "styled-components/native";

import Text from "./Text";

const DefaultStyledText = styled(Text)<{ alpha: number, family: string }>`
    color: ${({ theme, alpha }) => color(theme.colors.text).alpha(alpha).rgb().string()};
    text-align: left;
    font-family: ${props => props.theme.fonts[props.family].fontFamily};
    font-weight: ${props => props.theme.fonts[props.family].fontWeight};
    writing-direction: ${() => I18nManager.isRTL ? "rtl" : "ltr"};
`;

type Props = React.ComponentProps<typeof Text> & {
    alpha: number;
    family: "regular" | "medium" | "light" | "thin";
    style?: StyleProp<TextStyle>;
    theme: DefaultTheme;
};

const StyledText = (props: Props) => {
    const { theme, alpha, family, ...rest } = props;
    // const textColor = color(theme.colors.text).alpha(alpha).rgb().string();
    const font = theme.fonts[family];
    const writingDirection = I18nManager.isRTL ? "rtl" : "ltr";

    return (
        <DefaultStyledText
            theme={theme}
            alpha={alpha}
            family={family}
            {...rest}
            // style={[
            //     { color: textColor, ...font, textAlign: "left", writingDirection },
            // ]}
        />
    );
}

export default StyledText;
