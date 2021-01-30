import React, { useContext } from 'react';
import {
    Animated,
    ViewStyle,
    StyleSheet,
    StyleProp,
    TextStyle,
} from 'react-native';
import color from 'color';

import ActivityIndicator from '../ActivityIndicator/ActivityIndicator';
import SvgIcon from '../SvgIcon/SvgIcon';
import Surface from '../Surface/Surface';
import Text from '../Typography/Text';
import TouchableRipple from '../TouchableRipple/TouchableRipple';
import { black, white } from '../theme/colors';
import { DefaultTheme, ThemeContext } from 'styled-components';
import styled from "styled-components/native";

const ButtonSurface = styled(Surface)<{
    buttonStyle: any,
    compact: boolean,
    elevation: number | Animated.Value,
}>`
    min-width: 64;
    border-style: solid;

    background-color: ${props => props.buttonStyle.backgroundColor};
    border-color: ${props => props.buttonStyle.borderColor};
    border-width: ${props => props.buttonStyle.borderWidth};
    border-radius: ${props => props.buttonStyle.borderRadius};

    margin-horizontal: ${props => props.compact ? 8 : 0};
    elevation: ${props => +props.elevation};
`;

const ButtonContent = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const ButtonIconWrapperView = styled.View`
    margin-left: 12;
    margin-right: -4;
`;

const ButtonActivityIndicator = styled(ActivityIndicator)`
    margin-left: 12;
    margin-right: -4;
`;

const ButtonLabel = styled(Text)<{
    textColor: string,
    font: any,
    uppercase: boolean,
    compact: boolean,
}>`
    color: ${props => props.textColor};
    text-align: center;
    letter-spacing: 1;
    margin-vertical: 9;

    margin-horizontal: ${props => props.compact ? 8 : 16};
    text-transform: uppercase;
`;

type Props = React.ComponentProps<typeof Surface> & {
    /**
     * Mode of the button. You can change the mode to adjust the styling to give it desired emphasis.
     * - `text` - flat button without background or outline (low emphasis)
     * - `outlined` - button with an outline (medium emphasis)
     * - `contained` - button with a background color and elevation shadow (high emphasis)
     */
    mode?: 'text' | 'outlined' | 'contained';
    /**
     * Whether the color is a dark color. A dark button will render light text and vice-versa. Only applicable for `contained` mode.
     */
    dark?: boolean;
    /**
     * Use a compact look, useful for `text` buttons in a row.
     */
    compact?: boolean;
    /**
     * Custom text color for flat button, or background color for contained button.
     */
    color?: string;
    /**
     * Whether to show a loading indicator.
     */
    loading?: boolean;
    /**
     * Icon to display for the `Button`.
     */
    icon?: React.ReactElement;
    /**
     * Whether the button is disabled. A disabled button is greyed out and `onPress` is not called on touch.
     */
    disabled?: boolean;
    /**
     * Label text of the button.
     */
    children: React.ReactNode;
    /**
     * Make the label text uppercased. Note that this won't work if you pass React elements as children.
     */
    uppercase?: boolean;
    /**
     * Accessibility label for the button. This is read by the screen reader when the user taps the button.
     */
    accessibilityLabel?: string;
    /**
     * Function to execute on press.
     */
    onPress?: () => void;
    /**
     * Style of button's inner content.
     * Use this prop to apply custom height and width.
     */
    contentStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
    /**
     * Style for the button text.
     */
    labelStyle?: StyleProp<TextStyle>;
    /**
     * @optional
     */
    theme: DefaultTheme;
    /**
     * testID to be used on tests.
     */
    testID?: string;
};

/**
 * A button is component that the user can press to trigger an action.
 *
 * <div class="screenshots">
 *   <figure>
 *     <img src="screenshots/button-1.png" />
 *     <figcaption>Text button</figcaption>
 *   </figure>
 *   <figure>
 *     <img src="screenshots/button-2.png" />
 *     <figcaption>Outlined button</figcaption>
 *   </figure>
 *   <figure>
 *     <img src="screenshots/button-3.png" />
 *     <figcaption>Contained button</figcaption>
 *   </figure>
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Button } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
 *     Press me
 *   </Button>
 * );
 *
 * export default MyComponent;
 * ```
 */
const Button = ({
    disabled,
    compact,
    mode = 'text',
    dark,
    loading,
    icon,
    color: buttonColor,
    children,
    uppercase = true,
    accessibilityLabel,
    onPress,
    style,
    contentStyle,
    labelStyle,
    testID,
    ...rest
}: Props) => {
    const theme = useContext(ThemeContext);

    const { current: elevation } = React.useRef<Animated.Value>(
        new Animated.Value(mode === 'contained' ? 2 : 0)
    );

    const handlePressIn = () => {
        if (mode === 'contained') {
            const { scale } = theme.animation;
            Animated.timing(elevation, {
                toValue: 8,
                duration: 200 * scale,
                useNativeDriver: true,
            }).start();
        }
    };

    const handlePressOut = () => {
        if (mode === 'contained') {
            const { scale } = theme.animation;
            Animated.timing(elevation, {
                toValue: 2,
                duration: 150 * scale,
                useNativeDriver: true,
            }).start();
        }
    };

    const { colors, roundness } = theme;
    const font = theme.fonts.medium;

    let backgroundColor, borderColor, textColor, borderWidth;

    if (mode === 'contained') {
        if (disabled) {
            backgroundColor = color(theme.dark ? white : black)
                .alpha(0.12)
                .rgb()
                .string();
        } else if (buttonColor) {
            backgroundColor = buttonColor;
        } else {
            backgroundColor = colors.primary;
        }
    } else {
        backgroundColor = 'transparent';
    }

    if (mode === 'outlined') {
        borderColor = color(theme.dark ? white : black)
            .alpha(0.29)
            .rgb()
            .string();
        borderWidth = StyleSheet.hairlineWidth;
    } else {
        borderColor = 'transparent';
        borderWidth = 0;
    }

    if (disabled) {
        textColor = color(theme.dark ? white : black)
            .alpha(0.32)
            .rgb()
            .string();
    } else if (mode === 'contained') {
        let isDark;

        if (typeof dark === 'boolean') {
            isDark = dark;
        } else {
            isDark =
                backgroundColor === 'transparent'
                    ? false
                    : !color(backgroundColor).isLight();
        }

        textColor = isDark ? white : black;
    } else if (buttonColor) {
        textColor = buttonColor;
    } else {
        textColor = colors.primary;
    }

    const rippleColor = color(textColor).alpha(0.32).rgb().string();
    const buttonStyle = {
        backgroundColor,
        borderColor,
        borderWidth,
        borderRadius: roundness,
    };
    const touchableStyle = {
        borderRadius: style
            ? StyleSheet.flatten(style).borderRadius || roundness
            : roundness,
    };

    const { color: customLabelColor, fontSize: customLabelSize } =
        StyleSheet.flatten(labelStyle) || {};

    const elevationRes = disabled || mode !== 'contained' ? 0 : elevation;

    return (
        <ButtonSurface
            theme={theme}
            {...rest}
            buttonStyle={buttonStyle}
            compact={compact}
            elevation={elevationRes}
        >
            <TouchableRipple
                borderless
                delayPressIn={0}
                onPress={onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                accessibilityLabel={accessibilityLabel}
                accessibilityTraits={disabled ? ['button', 'disabled'] : 'button'}
                accessibilityComponentType="button"
                accessibilityRole="button"
                accessibilityState={{ disabled }}
                disabled={disabled}
                rippleColor={rippleColor}
                style={touchableStyle}
                testID={testID}
            >
                <ButtonContent>
                    {icon && loading !== true ? (
                        <ButtonIconWrapperView>
                            <SvgIcon
                                icon={icon}
                                size={customLabelSize || 16}
                                color={customLabelColor || textColor}
                            />
                        </ButtonIconWrapperView>
                    ) : null}
                    {loading ? (
                        <ButtonActivityIndicator
                            size={customLabelSize || 16}
                            color={customLabelColor || textColor}
                        />
                    ) : null}
                    <ButtonLabel
                        numberOfLines={1}
                        theme={theme}
                        font={font}
                        textColor={textColor}
                        uppercase={uppercase}
                        compact={compact}
                    >
                        {children}
                    </ButtonLabel>
                </ButtonContent>
            </TouchableRipple>
        </ButtonSurface>
    );
};

export default Button;
