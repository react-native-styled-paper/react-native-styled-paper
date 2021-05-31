import * as React from "react";
import { storiesOf } from "@storybook/react";
import Drawer, { DrawerContext } from "react-native-styled-paper/components/Drawer";
import { Text } from "react-native-styled-paper/components/Typography";
import Button from "react-native-styled-paper/components/Button";
import { ContainerFluid } from "react-native-styled-paper/components/Container";

const DrawerExample = (props) => {

    const { drawerIsOpen, setDrawerIsOpen } = React.useContext(DrawerContext);

    return (
        <>
            <Button
                onPress={() => setDrawerIsOpen(!drawerIsOpen)}
            >
                Toggle Drawer
            </Button>
            <ContainerFluid
                position="relative"
                height="100%"
            >
                <Drawer>
                    <Text numberOfLines={1}>Hello</Text>
                </Drawer>
            </ContainerFluid>
        </>
    );
};

storiesOf("Drawer", module)
    .add("Default", () => {
        return (
            <DrawerExample
            />
        )
    })