import * as React from "react";

import {
    StyleProp,
    StyleSheet,
    TextStyle,
    View,
    ViewStyle,
} from "react-native";

import Checkbox from "./Checkbox";
import CheckboxAndroid from "./CheckboxAndroid";
import CheckboxIOS from "./CheckboxIOS";
import Text from "../Typography/Text";
import TouchableRipple from "../TouchableRipple/TouchableRipple";
import { DefaultTheme, ThemeContext } from "styled-components";

type Props = {
    /**
     * Status of checkbox.
     */
    status: "checked" | "unchecked" | "indeterminate";
    /**
     * Whether checkbox is disabled.
     */
    disabled?: boolean;
    /**
     * Label to be displayed on the item.
     */
    label: string;
    /**
     * Function to execute on press.
     */
    onPress?: () => void;
    /**
     * Custom color for unchecked checkbox.
     */
    uncheckedColor?: string;
    /**
     * Custom color for checkbox.
     */
    color?: string;
    /**
     * Additional styles for container View.
     */
    style?: StyleProp<ViewStyle>;
    /**
     * Style that is passed to Label element.
     */
    labelStyle?: StyleProp<TextStyle>;
    /**
     * @optional
     */
    theme?: DefaultTheme;
    /**
     * testID to be used on tests.
     */
    testID?: string;
    /**
     * Whether `<Checkbox.Android />` or `<Checkbox.IOS />` should be used.
     * Left undefined `<Checkbox />` will be used.
     */
    mode?: "android" | "ios";
};

/**
 * Checkbox.Item allows you to press the whole row (item) instead of only the Checkbox.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { View } from 'react-native';
 * import { Checkbox } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <View>
 *     <Checkbox.Item label="Item" status="checked" />
 *   </View>
 * );
 *
 * export default MyComponent;
 *```
 */

const CheckboxItem = ({
    style,
    status,
    label,
    onPress,
    labelStyle,
    testID,
    mode,
    ...props
}: Props) => {
    const theme = React.useContext(ThemeContext);
    const checkboxProps = { ...props, status, theme };
    let checkbox;

    if (mode === "android") {
        checkbox = <CheckboxAndroid {...checkboxProps} />;
    } else if (mode === "ios") {
        checkbox = <CheckboxIOS {...checkboxProps} />;
    } else {
        checkbox = <Checkbox {...checkboxProps} />;
    }

    return (
        <TouchableRipple onPress={onPress} testID={testID}>
            <View style={[styles.container, style]} pointerEvents="none">
                <Text style={[styles.label, { color: theme.colors.text }, labelStyle]}>
                    {label}
                </Text>
                {checkbox}
            </View>
        </TouchableRipple>
    );
};

CheckboxItem.displayName = "Checkbox.Item";

export default CheckboxItem;

// @component-docs ignore-next-line
const CheckboxItemWithTheme = CheckboxItem;
// @component-docs ignore-next-line
export { CheckboxItemWithTheme as CheckboxItem };

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    label: {
        fontSize: 16,
        flex: 1,
    },
});
