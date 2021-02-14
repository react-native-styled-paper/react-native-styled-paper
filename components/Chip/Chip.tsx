import * as React from 'react';
import {
    AccessibilityState,
    // AccessibilityTrait,
    // AccessibilityRole,
    Animated,
    Platform,
    StyleProp,
    StyleSheet,
    TouchableWithoutFeedback,
    ViewStyle,
} from 'react-native';
import color from 'color';
import { SvgIcon } from '../Icon';
import { Surface } from '../Surface';
import { Text } from '../Typography';
import { TouchableRipple } from '../TouchableRipple';
import { black, white } from '../theme/colors';
import type { EllipsizeProp } from '../types';
import { DefaultTheme, ThemeContext } from 'styled-components';
import styled from "styled-components/native";
import CheckIcon from "@mdi/svg/svg/check.svg";
import CloseCircleIcon from "@mdi/svg/svg/close-circle.svg";

const ChipSurface = styled(Surface)({
    borderWidth: StyleSheet.hairlineWidth,
    borderStyle: 'solid',
    flexDirection: 'row',
});

const ChipContent = styled.View({
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 4,
    position: 'relative',
});

const ChipAvatarWrapper = styled.View({
    marginRight: 4,
})

const ChipIconWrapper = styled.View({
    padding: 4,
    alignSelf: 'center',
})

const ChipText = styled(Text)({
    minHeight: 24,
    lineHeight: 24,
    textAlignVertical: 'center',
    marginVertical: 4,
})

const ChipCloseButtonWrapper = styled.View({
    position: 'absolute',
    right: 0,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
})

const ChipCloseButtonIconWrapper = styled.View({
    padding: 4,
    alignSelf: 'center',
    marginRight: 4,
})

type Props = React.ComponentProps<typeof Surface> & {
    /**
     * Mode of the chip.
     * - `flat` - flat chip without outline.
     * - `outlined` - chip with an outline.
     */
    mode?: 'flat' | 'outlined';
    /**
     * Text content of the `Chip`.
     */
    children: React.ReactNode;
    /**
     * Icon to display for the `Chip`. Both icon and avatar cannot be specified.
     */
    icon?: React.ReactElement;
    /**
     * Avatar to display for the `Chip`. Both icon and avatar cannot be specified.
     */
    avatar?: React.ReactNode;
    /**
     * Whether chip is selected.
     */
    selected?: boolean;
    /**
     * Whether to style the chip color as selected.
     */
    selectedColor?: string;
    /**
     * Whether the chip is disabled. A disabled chip is greyed out and `onPress` is not called on touch.
     */
    disabled?: boolean;
    /**
     * Accessibility label for the chip. This is read by the screen reader when the user taps the chip.
     */
    accessibilityLabel?: string;
    /**
     * Accessibility label for the close icon. This is read by the screen reader when the user taps the close icon.
     */
    closeIconAccessibilityLabel?: string;
    /**
     * Function to execute on press.
     */
    onPress?: () => void;
    /**
     * Function to execute on long press.
     */
    onLongPress?: () => void;
    /**
     * Function to execute on close button press. The close button appears only when this prop is specified.
     */
    onClose?: () => void;
    /**
     * Style of chip's text
     */
    textStyle?: any;
    style?: StyleProp<ViewStyle>;

    /**
     * @optional
     */
    theme?: DefaultTheme;
    /**
     * Pass down testID from chip props to touchable for Detox tests.
     */
    testID?: string;
    /**
     * Ellipsize Mode for the children text
     */
    ellipsizeMode?: EllipsizeProp;
};

/**
 * Chips can be used to display entities in small blocks.
 *
 * <div class="screenshots">
 *   <figure>
 *     <img class="medium" src="screenshots/chip-1.png" />
 *     <figcaption>Flat chip</figcaption>
 *   </figure>
 *   <figure>
 *     <img class="medium" src="screenshots/chip-2.png" />
 *     <figcaption>Outlined chip</figcaption>
 *   </figure>
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Chip } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <Chip icon="information" onPress={() => console.log('Pressed')}>Example Chip</Chip>
 * );
 *
 * export default MyComponent;
 * ```
 */
const Chip = ({
    mode = 'flat',
    children,
    icon,
    avatar,
    selected = false,
    disabled = false,
    accessibilityLabel,
    closeIconAccessibilityLabel = 'Close',
    onPress,
    onLongPress,
    onClose,
    textStyle,
    style,
    testID,
    selectedColor,
    ellipsizeMode,
    ...rest
}: Props) => {
    const theme = React.useContext(ThemeContext);
    const { current: elevation } = React.useRef<Animated.Value>(
        new Animated.Value(0)
    );

    const handlePressIn = () => {
        const { scale } = theme.animation;
        Animated.timing(elevation, {
            toValue: 4,
            duration: 200 * scale,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        const { scale } = theme.animation;
        Animated.timing(elevation, {
            toValue: 0,
            duration: 150 * scale,
            useNativeDriver: true,
        }).start();
    };

    const { dark, colors } = theme;

    const {
        backgroundColor = mode === 'outlined'
            ? colors.surface
            : dark
                ? '#383838'
                : '#ebebeb',
        borderRadius = 16,
    } = StyleSheet.flatten(style) || {};

    const borderColor =
        mode === 'outlined'
            ? color(
                selectedColor !== undefined
                    ? selectedColor
                    : color(dark ? white : black)
            )
                .alpha(0.29)
                .rgb()
                .string()
            : backgroundColor;
    const textColor = disabled
        ? colors.disabled
        : color(selectedColor !== undefined ? selectedColor : colors.text)
            .alpha(0.87)
            .rgb()
            .string();
    const iconColor = disabled
        ? colors.disabled
        : color(selectedColor !== undefined ? selectedColor : colors.text)
            .alpha(0.54)
            .rgb()
            .string();
    const selectedBackgroundColor = (dark
        // TODO: please check types
        ? color(backgroundColor as any).lighten(mode === 'outlined' ? 0.2 : 0.4)
        : color(backgroundColor as any).darken(mode === 'outlined' ? 0.08 : 0.2)
    )
        .rgb()
        .string();

    const underlayColor = selectedColor
        ? color(selectedColor).fade(0.5).rgb().string()
        : selectedBackgroundColor;

    const accessibilityTraits: any[] = ['button'];
    // const accessibilityTraits: AccessibilityRole[] = ['button'];
    // const accessibilityTraits: AccessibilityTrait[] = ['button'];
    const accessibilityState: AccessibilityState = {
        selected,
        disabled,
    };

    if (selected) {
        accessibilityTraits.push('selected');
    }

    if (disabled) {
        accessibilityTraits.push('disabled');
    }

    return (
        <ChipSurface
            style={
                [
                    {
                        elevation: Platform.OS === 'android' ? elevation : 0,
                        backgroundColor: selected
                            ? selectedBackgroundColor
                            : backgroundColor,
                        borderColor,
                        borderRadius,
                    },
                    style,
                ] as StyleProp<ViewStyle>
            }
            {...rest}
        >
            <TouchableRipple
                borderless
                delayPressIn={0}
                style={{ borderRadius }}
                onPress={onPress}
                onLongPress={onLongPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                underlayColor={underlayColor}
                disabled={disabled}
                accessibilityLabel={accessibilityLabel}
                // accessibilityTraits={accessibilityTraits}
                // accessibilityComponentType="button"
                accessibilityRole="button"
                accessibilityState={accessibilityState}
                testID={testID}
            >
                <ChipContent style={[{ paddingRight: onClose ? 32 : 4 }]}>
                    {avatar && !icon ? (
                        <ChipAvatarWrapper style={[disabled && { opacity: 0.26 }]}>
                            {React.isValidElement(avatar)
                                ? React.cloneElement(avatar, {
                                    style: [styles.avatar, avatar.props.style],
                                })
                                : avatar}
                        </ChipAvatarWrapper>
                    ) : null}
                    {icon || selected ? (
                        <ChipIconWrapper
                            style={[
                                avatar ? [
                                    styles.avatar,
                                    styles.avatarSelected
                                ] : null,
                            ]}
                        >
                            {icon ? (
                                <SvgIcon
                                    icon={icon}
                                    color={avatar ? white : iconColor}
                                    size={18}
                                />
                            ) : (
                                    <CheckIcon
                                        color={avatar ? white : iconColor}
                                        size={18}
                                        direction="ltr"
                                    />
                                )}
                        </ChipIconWrapper>
                    ) : null}
                    <ChipText
                        selectable={false}
                        numberOfLines={1}
                        style={[
                            {
                                fontFamily: theme.fonts.regular.fontFamily,
                                fontWeight: theme.fonts.regular.fontWeight,
                                color: textColor,
                                marginRight: onClose ? 0 : 8,
                                marginLeft: avatar || icon || selected ? 4 : 8,
                            },
                            textStyle,
                        ]}
                        ellipsizeMode={ellipsizeMode}
                    >
                        {children}
                    </ChipText>
                </ChipContent>
            </TouchableRipple>
            {onClose ? (
                <ChipCloseButtonWrapper>
                    <TouchableWithoutFeedback
                        onPress={onClose}
                        // accessibilityTraits="button"
                        // accessibilityComponentType="button"
                        accessibilityRole="button"
                        accessibilityLabel={closeIconAccessibilityLabel}
                    >
                        <ChipCloseButtonIconWrapper>
                            <CloseCircleIcon
                                size={16}
                                color={iconColor}
                                direction="ltr"
                            />
                        </ChipCloseButtonIconWrapper>
                    </TouchableWithoutFeedback>
                </ChipCloseButtonWrapper>
            ) : null}
        </ChipSurface>
    );
};

const styles = StyleSheet.create({
    avatar: {
        width: 24,
        height: 24,
        borderRadius: 12,
    },
    avatarWrapper: {
        marginRight: 4,
    },
    avatarSelected: {
        position: 'absolute',
        top: 4,
        left: 4,
        backgroundColor: 'rgba(0, 0, 0, .29)',
    },
});

export default Chip;
