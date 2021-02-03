import * as React from "react";
import {
    View,
    KeyboardAvoidingView,
    Modal,
    TouchableOpacity,
    Animated,
    PanResponder,
    Platform
} from "react-native";

const SUPPORTED_ORIENTATIONS = [
    "portrait",
    "portrait-upside-down",
    "landscape",
    "landscape-left",
    "landscape-right"
];

type Props = {
    animationType?: "none" | "slide" | "fade",
    height?: number,
    minClosingHeight?: number,
    openDuration?: number,
    closeDuration?: number,
    closeOnDragDown?: boolean,
    closeOnPressMask?: boolean,
    dragFromTopOnly?: boolean,
    closeOnPressBack?: boolean,
    keyboardAvoidingViewEnabled?: boolean,
    customStyles?: Record<string, unknown>,
    onClose?: (evt) => void,
    onOpen?: (evt) => void,
    children?: React.ReactNode,
};

type State = {
    animatedHeight: Animated.Value,
    pan: Animated.ValueXY,
    modalVisible: boolean,
}

class RBSheet extends React.Component<Props, State> {

    static defaultProps = {
        animationType: "none",
        height: 260,
        minClosingHeight: 0,
        openDuration: 300,
        closeDuration: 200,
        closeOnDragDown: false,
        dragFromTopOnly: false,
        closeOnPressMask: true,
        closeOnPressBack: true,
        keyboardAvoidingViewEnabled: Platform.OS === "ios",
        customStyles: {},
        onClose: null,
        onOpen: null,
        children: <View />
    };

    state: State = {
        modalVisible: false,
        animatedHeight: new Animated.Value(0),
        pan: new Animated.ValueXY()
    };

    panResponder;

    constructor(props) {
        super(props);

        this.createPanResponder(props);
    }

    setModalVisible(visible, props?) {
        const { height, minClosingHeight, openDuration, closeDuration, onClose, onOpen } = this.props;
        const { animatedHeight, pan } = this.state;
        if (visible) {
            this.setState({ modalVisible: visible });
            if (typeof onOpen === "function") onOpen(props);
            Animated.timing(animatedHeight, {
                useNativeDriver: false,
                toValue: height,
                duration: openDuration
            }).start();
        } else {
            Animated.timing(animatedHeight, {
                useNativeDriver: false,
                toValue: minClosingHeight,
                duration: closeDuration
            }).start(() => {
                pan.setValue({ x: 0, y: 0 });
                this.setState({
                    modalVisible: visible,
                    animatedHeight: new Animated.Value(0)
                });

                if (typeof onClose === "function") onClose(props);
            });
        }
    }

    createPanResponder(props) {
        const { closeOnDragDown, height } = props;
        const { pan } = this.state;
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => closeOnDragDown,
            onPanResponderMove: (e, gestureState) => {
                if (gestureState.dy > 0) {
                    Animated.event([null, { dy: pan.y }], { useNativeDriver: false })(e, gestureState);
                }
            },
            onPanResponderRelease: (e, gestureState) => {
                if (height / 4 - gestureState.dy < 0) {
                    this.setModalVisible(false);
                } else {
                    Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
                }
            }
        });
    }

    open(props?) {
        this.setModalVisible(true, props);
    }

    close(props?) {
        this.setModalVisible(false, props);
    }

    render() {
        const {
            animationType,
            closeOnDragDown,
            dragFromTopOnly,
            closeOnPressMask,
            closeOnPressBack,
            children,
            customStyles,
            keyboardAvoidingViewEnabled
        } = this.props;
        const { animatedHeight, pan, modalVisible } = this.state;
        const panStyle = {
            transform: pan.getTranslateTransform()
        };

        return (
            <Modal
                transparent
                animationType={animationType}
                visible={modalVisible}

                // @ts-ignore
                supportedOrientations={SUPPORTED_ORIENTATIONS}
                onRequestClose={() => {
                    if (closeOnPressBack) this.setModalVisible(false);
                }}
            >
                <KeyboardAvoidingView
                    enabled={keyboardAvoidingViewEnabled}
                    behavior="padding"
                    style={[
                        {
                            flex: 1,
                            backgroundColor: "#00000077",
                        },
                        customStyles.wrapper,
                    ]}
                >
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            backgroundColor: "transparent"
                        }}
                        activeOpacity={1}
                        onPress={() => (closeOnPressMask ? this.close() : null)}
                    />
                    <Animated.View
                        {...(!dragFromTopOnly && this.panResponder.panHandlers)}
                        style={[
                            panStyle,
                            {
                                backgroundColor: "#fff",
                                width: "100%",
                                height: 0,
                                overflow: "hidden"
                            },
                            { height: animatedHeight },
                            customStyles.container
                        ]}
                    >
                        {closeOnDragDown && (
                            <View
                                {...(dragFromTopOnly && this.panResponder.panHandlers)}
                                style={{
                                    width: "100%",
                                    alignItems: "center",
                                    backgroundColor: "transparent"
                                }}
                            >
                                <View style={[
                                    {
                                        width: 35,
                                        height: 5,
                                        borderRadius: 5,
                                        margin: 10,
                                        backgroundColor: "#ccc",
                                    },
                                    customStyles.draggableIcon,
                                ]} />
                            </View>
                        )}
                        {children}
                    </Animated.View>
                </KeyboardAvoidingView>
            </Modal>
        );
    }
}

export default RBSheet;
