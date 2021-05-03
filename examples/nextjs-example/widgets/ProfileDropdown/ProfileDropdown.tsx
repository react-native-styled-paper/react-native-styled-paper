import * as React from "react";
import { Button } from "react-native-styled-paper/components/Button";
import { Divider } from "react-native-styled-paper/components/Divider";
import { Menu } from "react-native-styled-paper/components/Menu";

const ProfileDropdown = (props) => {

    const [visible, setVisible] = React.useState(false);

    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);

    return (
        <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={<Button onPress={openMenu}>Show menu</Button>}
        >
            <Menu.Item onPress={() => { }} title="Item 1" />
            <Menu.Item onPress={() => { }} title="Item 2" />
            <Divider />
            <Menu.Item onPress={() => { }} title="Item 3" />
        </Menu>
    )
}

export default ProfileDropdown;
