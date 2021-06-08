import * as React from "react";
import { Modal } from "react-native";
import { storiesOf } from "@storybook/react";
import Button from "react-native-styled-paper/components/Button";

const ReactModalExample = (props) => {

    const [ visible, setVisible ] = React.useState(false);

    const open = () => setVisible(true)
    const close = () => setVisible(false);

    return (
        <>
            <Button onPress={open} >Open</Button>
            <Modal
                testID={'modal'}
                visible={visible}
                // backdropColor="#B4B3DB"
                // backdropOpacity={0.8}
                // animationIn="zoomInDown"
                // animationOut="zoomOutUp"
                // animationInTiming={600}
                // animationOutTiming={600}
                // backdropTransitionInTiming={600}
                // backdropTransitionOutTiming={600}
            >
                <Button onPress={close} >Close</Button>
            </Modal>
        </>
    )
}

storiesOf("ReactModal", module)
    .add("Default", () => {

        return (
            <ReactModalExample
            />
        )
    })