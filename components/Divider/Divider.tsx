import * as React from "react";
import color from "color";
import { StyleSheet, View, ViewStyle, StyleProp } from "react-native";
import styled from "styled-components/native";
import { DefaultTheme } from "styled-components";
import { black, white } from "../theme/colors";
import type { $RemoveChildren } from "../types";

const DividerView = styled.View<{ inset: boolean, isDarkTheme: boolean }>`
    background-color: ${props => props.isDarkTheme ? color(white).alpha(0.12).rgb().string() : color(black).alpha(0.12).rgb().string()};
    height: ${StyleSheet.hairlineWidth},
    margin-left: ${props => props.inset ? 72 : 0};
`;

type Props = $RemoveChildren<typeof View> & {
    /**
     *  Whether divider has a left inset.
     */
    inset?: boolean;
    style?: StyleProp<ViewStyle>;
    /**
     * @optional
     */
    theme?: DefaultTheme;
};

/**
 * A divider is a thin, lightweight separator that groups content in lists and page layouts.
 *
 * <div class="screenshots">
 *  <figure>
 *    <img class="medium" src="screenshots/divider.png" />
 *  </figure>
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { View } from 'react-native';
 * import { Divider, Text } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <View>
 *     <Text>Apple</Text>
 *     <Divider />
 *     <Text>Orange</Text>
 *     <Divider />
 *   </View>
 * );
 *
 * export default MyComponent;
 * ```
 */
const Divider = ({ inset, theme, ...rest }: Props) => {
    const { dark: isDarkTheme } = theme;
    return (
        <DividerView
            {...rest}
            theme={theme}
            inset={inset}
            isDarkTheme={isDarkTheme}
        />
    );
};

export default Divider;
