import * as React from "react";
import { Text as NativeText, TextStyle, StyleProp } from "react-native";
import { DefaultTheme, ThemeContext } from "styled-components";
import styled from "styled-components/native";

const DefaultText = styled.Text`
    font-family: ${props => props.theme.fonts.regular.fontFamily};
    font-weight: ${props => props.theme.fonts.regular.fontWeight};
    color: ${props => props.theme.colors.text};
    text-align: left;
`;

type Props = React.ComponentProps<typeof NativeText> & {
    children: React.ReactNode,
    style?: StyleProp<TextStyle>;
    /**
     * @optional
     */
    theme?: DefaultTheme;
};

// @component-group Typography

/**
 * Text component which follows styles from the theme.
 *
 * @extends Text props https://facebook.github.io/react-native/docs/text.html#props
 */
const Text = (props: Props) => {

    const { children, ...rest } = props;
    const theme = React.useContext(ThemeContext);

    return (
        <DefaultText
            {...rest}
            // style={[
            //     {
            //         ...theme.fonts.regular,
            //     },
            // ]}
            theme={theme}
        >
            {children}
        </DefaultText>
    );
};

export default Text;
