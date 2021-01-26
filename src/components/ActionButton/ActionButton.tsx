import React, { useState, useRef, useEffect } from "react";
import {
    StyleSheet,
    TextPropTypes,
    View,
    Animated,
    TouchableOpacity
} from "react-native";
import styled from "styled-components/native";
import ActionButtonItem from "./ActionButtonItem";
import {
    shadowStyle,
    alignItemsMap,
    getTouchableComponent,
    isAndroid,
    touchableBackground,
    DEFAULT_ACTIVE_OPACITY
} from "./utils";

type Props = {
    resetToken: any,
    active: boolean,

    position: string,
    elevation: number,
    zIndex: number,

    hideShadow: boolean,
    shadowStyle: Object | any[] | number;

    renderIcon: Function,

    bgColor: string,
    bgOpacity: number,
    buttonColor: string,
    buttonTextStyle: typeof TextPropTypes,
    buttonText: string,

    offsetX: number,
    offsetY: number,
    spacing: number,
    size: number,
    autoInactive: boolean,
    onPress: Function,
    onPressIn: Function,
    onPressOut: Function,
    backdrop: boolean | Object,
    degrees: number,
    verticalOrientation: "up" | "down",
    backgroundTappable: boolean,
    activeOpacity: number,

    useNativeFeedback: boolean,
    fixNativeFeedbackRadius: boolean,
    nativeFeedbackRippleColor: string,

    testID: string,
    accessibilityLabel: string,
    accessible: boolean
};

const ActionButtonWrapperView = styled.View<{
    elevation: number,
    zIndex: number,
    verticalOrientation: string,
}>`
    position: "absolute";
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    background-color: "transparent";
    elevation: ${props => props.elevation};
    z-index: ${props => props.zIndex};
    justify-content: ${props => props.verticalOrientation === "up" ? "flex-end" : "flex-start"};
`;

const ActionButtonBodyView = styled.View<{
    elevation: number,
    zIndex: number,
    verticalOrientation: string,
    position: string,
    offsetY: number,
}>`
    position: "absolute";
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    background-color: "transparent";
    elevation: ${props => props.elevation};
    z-index: ${props => props.zIndex};
    justify-content: ${props => props.verticalOrientation === "up" ? "flex-end" : "flex-start"};

    align-items: ${props => alignItemsMap[props.position]};

    padding-vertical: ${props => props.offsetY};
`;

const ActionWrapperView = styled.View<{
    verticalOrientation: string,
    spacing: number,
    zIndex: number,
}>`
    flex: 1;
    align-self: stretch;
    justify-content: ${props => props.verticalOrientation === "up" ? "flex-end" : "flex-start"};
    padding-top: ${props => props.verticalOrientation === "down" ? props.spacing : 0};
    z-index: ${props => props.zIndex};
`;

const TappableBackground = styled(TouchableOpacity)<Props>`
    position: "absolute";
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    background-color: "transparent";
    elevation: ${props => props.elevation};
    z-index: ${props => props.zIndex};
    justify-content: ${props => props.verticalOrientation === "up" ? "flex-end" : "flex-start"};
`;

const ActionButton = props => {
    const [, setResetToken] = useState(props.resetToken);
    const [active, setActive] = useState(props.active);
    const anim = useRef(new Animated.Value(props.active ? 1 : 0));
    const timeout = useRef(null);
    const mounted = useRef(false);

    useEffect(() => {
        mounted.current = true;

        return () => {
            mounted.current = false;
            timeout.current && clearTimeout(timeout.current);
        };
    }, []);

    useEffect(() => {
        if (props.active) {
            Animated.spring(anim.current, { toValue: 1, useNativeDriver: true }).start();
            setActive(true);
            setResetToken(props.resetToken);
        } else {
            props.onReset && props.onReset();

            Animated.spring(anim.current, { toValue: 0, useNativeDriver: true }).start();
            timeout.current = setTimeout(() => {
                setActive(false);
                setResetToken(props.resetToken);
            }, 250);
        }
    }, [props.resetToken, props.active]);

    //////////////////////
    // STYLESHEET GETTERS
    //////////////////////

    const getOverlayStyles = () => {
        return [
            styles.overlay,
            {
                elevation: props.elevation,
                zIndex: props.zIndex,
                justifyContent:
                    props.verticalOrientation === "up" ? "flex-end" : "flex-start"
            }
        ];
    };

    const _renderMainButton = () => {
        const animatedViewStyle = {
            transform: [
                {
                    scale: anim.current.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, props.outRangeScale]
                    })
                },
                {
                    rotate: anim.current.interpolate({
                        inputRange: [0, 1],
                        outputRange: ["0deg", props.degrees + "deg"]
                    })
                }
            ]
        };

        const wrapperStyle = {
            backgroundColor: anim.current.interpolate({
                inputRange: [0, 1],
                outputRange: [props.buttonColor, props.btnOutRange || props.buttonColor]
            }),
            width: props.size,
            height: props.size,
            borderRadius: props.size / 2
        };

        const buttonStyle = {
            width: props.size,
            height: props.size,
            borderRadius: props.size / 2,
            alignItems: "center",
            justifyContent: "center"
        } as any;

        const Touchable = getTouchableComponent(props.useNativeFeedback);
        const parentStyle =
            isAndroid && props.fixNativeFeedbackRadius
                ? {
                    right: props.offsetX,
                    zIndex: props.zIndex,
                    borderRadius: props.size / 2,
                    width: props.size
                }
                : { marginHorizontal: props.offsetX, zIndex: props.zIndex };

        return (
            <View
                style={[
                    parentStyle,
                    !props.hideShadow && shadowStyle,
                    !props.hideShadow && props.shadowStyle
                ]}
            >
                {/* @ts-ignore */}
                <Touchable
                    testID={props.testID}
                    accessible={props.accessible}
                    accessibilityLabel={props.accessibilityLabel}
                    background={touchableBackground(
                        props.nativeFeedbackRippleColor,
                        props.fixNativeFeedbackRadius
                    )}
                    activeOpacity={props.activeOpacity}
                    onLongPress={props.onLongPress}
                    onPress={() => {
                        props.onPress();
                        if (props.children) animateButton();
                    }}
                    onPressIn={props.onPressIn}
                    onPressOut={props.onPressOut}
                >
                    <Animated.View style={wrapperStyle}>
                        <Animated.View style={[buttonStyle, animatedViewStyle]}>
                            {_renderButtonIcon()}
                        </Animated.View>
                    </Animated.View>
                </Touchable>
            </View>
        );
    };

    const _renderButtonIcon = () => {
        const {
            icon,
            renderIcon,
            btnOutRangeTxt,
            buttonTextStyle,
            buttonText
        } = props;
        if (renderIcon) return renderIcon(active);
        if (icon) {
            console.warn(
                "react-native-action-button: The `icon` prop is deprecated! Use `renderIcon` instead."
            );
            return icon;
        }

        const textColor = buttonTextStyle.color || "rgba(255,255,255,1)";

        return (
            <Animated.Text
                style={[
                    styles.btnText,
                    buttonTextStyle,
                    {
                        color: anim.current.interpolate({
                            inputRange: [0, 1],
                            outputRange: [textColor, btnOutRangeTxt || textColor]
                        })
                    }
                ]}
            >
                {buttonText}
            </Animated.Text>
        );
    };

    const _renderActions = () => {
        const { children, verticalOrientation } = props;

        if (!active) return null;

        let actionButtons = !Array.isArray(children) ? [children] : children;

        actionButtons = actionButtons.filter(
            actionButton => typeof actionButton == "object"
        );

        return (
            <ActionWrapperView
                theme={props.theme}
                verticalOrientation={verticalOrientation}
                spacing={props.spacing}
                zIndex={props.zIndex}
                pointerEvents={"box-none"}
            >
                {actionButtons.map((ActionButton, idx) => (
                    <ActionButtonItem
                        key={idx}
                        anim={anim.current}
                        {...props}
                        {...ActionButton.props}
                        parentSize={props.size}
                        btnColor={props.btnOutRange}
                        onPress={() => {
                            if (props.autoInactive) {
                                timeout.current = setTimeout(reset, 200);
                            }
                            ActionButton.props.onPress();
                        }}
                    />
                ))}
            </ActionWrapperView>
        );
    };

    const _renderTappableBackground = (props) => {
        return (
            <TappableBackground
                {...props}
                activeOpacity={1}
                onPress={reset}
            />
        );
    };

    //////////////////////
    // Animation Methods
    //////////////////////

    const animateButton = (animate = true) => {
        if (active) return reset(animate);

        if (animate) {
            Animated.spring(anim.current, { toValue: 1, useNativeDriver: true }).start();
        } else {
            anim.current.setValue(1);
        }

        setActive(true);
    };

    const reset = (animate = true) => {
        if (props.onReset) props.onReset();

        if (animate) {
            Animated.spring(anim.current, { toValue: 0, useNativeDriver: true }).start();
        } else {
            anim.current.setValue(0);
        }

        timeout.current = setTimeout(() => {
            if (mounted.current) {
                setActive(false);
            }
        }, 250);
    };

    return (
        <ActionButtonWrapperView
            {...props}
            pointerEvents="box-none"
        >
            <Animated.View
                pointerEvents="none"
                style={[
                    getOverlayStyles() as any,
                    {
                        backgroundColor: props.bgColor,
                        opacity: anim.current.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, props.bgOpacity]
                        })
                    }
                ]}
            >
                {props.backdrop}
            </Animated.View>
            <ActionButtonBodyView
                theme={props.theme}
                elevation={props.elevation}
                zIndex={props.zIndex}
                verticalOrientation={props.verticalOrientation}
                position={props.position}
                offsetY={props.offsetY}
                pointerEvents="box-none"
            >
                {active && !props.backgroundTappable && _renderTappableBackground(props)}

                {props.verticalOrientation === "up" &&
                    props.children &&
                    _renderActions()}
                {_renderMainButton()}
                {props.verticalOrientation === "down" &&
                    props.children &&
                    _renderActions()}
            </ActionButtonBodyView>
        </ActionButtonWrapperView>
    );
};

ActionButton.Item = ActionButtonItem;

ActionButton.defaultProps = {
    resetToken: null,
    active: false,
    bgColor: "transparent",
    bgOpacity: 1,
    buttonColor: "rgba(0,0,0,1)",
    buttonTextStyle: {},
    buttonText: "+",
    spacing: 20,
    outRangeScale: 1,
    autoInactive: true,
    onPress: () => { },
    onPressIn: () => { },
    onPressOn: () => { },
    backdrop: false,
    degrees: 45,
    position: "right",
    offsetX: 30,
    offsetY: 30,
    size: 56,
    verticalOrientation: "up",
    backgroundTappable: false,
    useNativeFeedback: true,
    activeOpacity: DEFAULT_ACTIVE_OPACITY,
    fixNativeFeedbackRadius: false,
    nativeFeedbackRippleColor: "rgba(255,255,255,0.75)",
    testID: undefined,
    accessibilityLabel: undefined,
    accessible: undefined
};

const styles = StyleSheet.create({
    overlay: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
        backgroundColor: "transparent"
    },
    btnText: {
        marginTop: -4,
        fontSize: 24,
        backgroundColor: "transparent"
    }
});

export default ActionButton;
