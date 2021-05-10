import * as React from "react";
import styled from "styled-components";
import { ScrollView, View, Text, useWindowDimensions } from "react-native";
import { compose, layout, LayoutProps, space, SpaceProps } from "styled-system";
import { Appbar } from "widgets/Appbar/Appbar";
import { LeftNav } from "widgets/LeftNav";
import { ProfileDropdown } from "widgets/ProfileDropdown";
import { Viewport } from "react-native-styled-paper/components/Container";
import useScrollInfo from "react-native-styled-paper/components/hooks/useScrollInfo";

const PageContainer = styled.div<LayoutProps & SpaceProps>({
    maxWidth: "100%",
    flex: 1,
    overflowY: "auto",
}, compose(layout, space));

PageContainer.defaultProps = {
    height: "100vh",
};

type Props = {
    children?: React.ReactNode,
    scrollCallback?: (opts?: Record<string, any>) => void,
};

function Layout(props: Props) {

    const scrollViewRef = React.useRef();
    const myViewRef = React.useRef(null);
    const { height: wHeight } = useWindowDimensions();

    const {
        children,
        scrollCallback,
    } = props;

    const [ scrollViewPos, setScrollViewPos ] = React.useState(0);

    useScrollInfo(myViewRef, (isVisible) => {
        // console.info("isVisible ", isVisible);
    });

    const _handleScroll = (evt) => {
        console.info("Scroll ", evt.nativeEvent.contentOffset.y);
        setScrollViewPos(evt.nativeEvent.contentOffset.y);

        if (myViewRef.current) {
            myViewRef.current.measure((x, y, width, height, pageX, pageY) => {
                // const scrollInfo = {
                //     rectTop: pageY,
                //     rectBottom: pageY + height,
                //     rectWidth: pageX + width
                // };

                // const isVisible =
                //     scrollInfo.rectBottom != 0 &&
                //     scrollInfo.rectTop >= 0 &&
                //     scrollInfo.rectBottom <= wHeight &&
                //     scrollInfo.rectWidth > 0 &&
                //     scrollInfo.rectWidth <= wWwidth;

                // console.info("isVisible ", isVisible, "direction ", evt.nativeEvent.contentOffset.y - scrollViewPos);
            });
        }

        if (typeof scrollCallback === "function") {
            scrollCallback({
                direction: evt.nativeEvent.contentOffset.y - scrollViewPos < 0 ? -1 : 1,
            });
        }
    }

    return (
        <Viewport>
            <Appbar>
                <ProfileDropdown
                />
            </Appbar>
            <LeftNav
            />
            <PageContainer
                data-testid="RNSP__viewport_container"
                height={wHeight}
                paddingLeft={[ "0", "240px" ]}
            >
                <ScrollView
                    ref={scrollViewRef}
                    onScroll={_handleScroll}
                    style={{
                        height: "100%",
                    }}
                >
                    {children}
                    <View ref={myViewRef}>
                        <Text>{"Hello"}</Text>
                    </View>
                </ScrollView>
            </PageContainer>
        </Viewport>
    );
}

export default Layout;
