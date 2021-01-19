import color from "color";
import React from "react";
import { I18nManager, StyleProp, TextStyle } from "react-native";
import { DefaultTheme } from "styled-components";
import styled from "styled-components/native";

import Text from "./Text";

const DefaultStyledText = styled(Text)`
`;

type Props = React.ComponentProps<typeof Text> & {
    alpha: number;
    family: "regular" | "medium" | "light" | "thin";
    style?: StyleProp<TextStyle>;
    theme: DefaultTheme;
};

class StyledText extends React.Component<Props> {
    render() {
        const { theme, alpha, family, style, ...rest } = this.props;
        const textColor = color(theme.colors.text).alpha(alpha).rgb().string();
        const font = theme.fonts[family];
        const writingDirection = I18nManager.isRTL ? "rtl" : "ltr";

        return (
            <DefaultStyledText
                {...rest}
                style={[
                    { color: textColor, ...font, textAlign: "left", writingDirection },
                    style,
                    this.props.style,
                ]}
            />
        );
    }
}

export default StyledText;
