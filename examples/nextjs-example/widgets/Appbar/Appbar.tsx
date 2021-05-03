import * as React from "react";
import styled from "styled-components";
import { default as RNSPAppbar } from "react-native-styled-paper/components/Appbar";
import { Menu } from "react-native-styled-paper/components/Menu";
import MenuIcon from "@mdi/svg/svg/menu.svg";
import { Text } from "react-native-styled-paper/components/Typography";

import { useWindowSize } from "../../hooks/useWindowSize";

const StyledRNSPAppbar = styled(RNSPAppbar)({
    zIndex: 1,
});

const MiddleContainer = styled.div({
    flexGrow: 1,
});

const DesktopAppbar = (props) => {
    const [visible, setVisible] = React.useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    return (
        <StyledRNSPAppbar>
            <Text>Appbar</Text>
            <MiddleContainer>
                <RNSPAppbar.Action
                    icon={MenuIcon}
                    color="black"
                    onPress={() => console.log('Pressed archive')}
                />
            </MiddleContainer>
            <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchor={
                    <RNSPAppbar.Action icon={MenuIcon} color="white" size={24} onPress={openMenu} />
                }>
                <Menu.Item onPress={() => {console.log('Option 1 was pressed')}} title="Option 1" />
                <Menu.Item onPress={() => {console.log('Option 2 was pressed')}} title="Option 2" />
                <Menu.Item onPress={() => {console.log('Option 3 was pressed')}} title="Option 3" disabled />
            </Menu>
        </StyledRNSPAppbar>
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
    const { isMobileView } = useWindowSize();
    const { children } = props;

    return isMobileView ?
        <MobileAppbar {...props}>{children}</MobileAppbar> :
        <DesktopAppbar {...props}>{children}</DesktopAppbar>;
}
