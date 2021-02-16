import * as React from "react";
import { default as RNSPAppbar } from "react-native-styled-paper/components/Appbar";
import { Menu } from "react-native-styled-paper/components/Menu";
import MenuIcon from "@mdi/svg/svg/menu.svg";
import { Text } from "react-native-styled-paper/components/Typography";

import { useWindowSize } from "../../hooks/useWindowSize";

const DesktopAppbar = (props) => {
    const [visible, setVisible] = React.useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    return (
        <RNSPAppbar>
            <RNSPAppbar.Action
                icon={MenuIcon}
                color="black"
                onPress={() => console.log('Pressed archive')}
            />
            <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchor={
                    <RNSPAppbar.Action icon={MenuIcon} color="white" onPress={openMenu} />
                }>
                <Menu.Item onPress={() => {console.log('Option 1 was pressed')}} title="Option 1" />
                <Menu.Item onPress={() => {console.log('Option 2 was pressed')}} title="Option 2" />
                <Menu.Item onPress={() => {console.log('Option 3 was pressed')}} title="Option 3" disabled />
            </Menu>
        </RNSPAppbar>
    )
}

const MobileAppbar = (props) => {
    return (
        <RNSPAppbar>
            <Text>Appbar</Text>
        </RNSPAppbar>
    )
}


export const Appbar = (props) => {
    const { isMobileView } = useWindowSize()

    return isMobileView ?
        <MobileAppbar {...props} /> :
        <DesktopAppbar {...props} />;
}
