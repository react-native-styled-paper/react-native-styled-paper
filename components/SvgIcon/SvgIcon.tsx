import * as React from "react";
import { Text as NativeText, TextStyle, StyleProp } from "react-native";
import { DefaultTheme } from "styled-components";

type Props = React.ComponentProps<typeof NativeText> & {
    icon: React.ReactElement,

    size?: number,

    color?: string,

    style?: StyleProp<TextStyle>;
    /**
     * @optional
     */
    theme?: DefaultTheme;
};

const SvgIcon = (props: Props) => {

    const { icon: Icon, ...rest } = props;

    return (
        // @ts-ignore
        <Icon
            {...rest}
        />
    );
};

export default SvgIcon;
