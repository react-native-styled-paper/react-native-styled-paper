import React from "react";
import { Text as NativeText, TextStyle, StyleProp } from "react-native";
import { DefaultTheme } from "styled-components";
import styled from "styled-components/native";

const DefaultText = styled.Text`
    color: ${props => props.theme.colors.text}
    text-align: left;
`;

type Props = React.ComponentProps<typeof NativeText> & {
    style?: StyleProp<TextStyle>;
    /**
     * @optional
     */
    theme: DefaultTheme;
};

// @component-group Typography

/**
 * Text component which follows styles from the theme.
 *
 * @extends Text props https://facebook.github.io/react-native/docs/text.html#props
 */
class Text extends React.Component<Props> {

    private root: NativeText | undefined | null;

    /**
     * @internal
     */
    setNativeProps(args: Record<string, unknown>) {
        return this.root && this.root.setNativeProps(args);
    }

    render() {
        const { style, theme, ...rest } = this.props;

        return (
            <DefaultText
                {...rest}
                ref={(c) => {
                    this.root = c;
                }}
                style={[
                    {
                        ...theme.fonts.regular,
                        color: theme.colors.text,
                        textAlign: "left",
                    },
                    style,
                ]}
            />
        );
    }
}

export default Text;
