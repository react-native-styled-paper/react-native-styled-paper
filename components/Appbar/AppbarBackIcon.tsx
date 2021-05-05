import * as React from "react";
// import { Platform, I18nManager, View, Image } from "react-native";
import { I18nManager } from "react-native";
// @ts-ignore
import ArrowLeftIcon from "@mdi/svg/svg/arrow-left.svg";

const AppbarBackIcon = ({ size, color }: { size: number; color: string }) => {
    // const iosIconSize = size - 3;

    // return Platform.OS === "ios" ? (
    //     <View
    //         style={[
    //             {
    //                 alignItems: "center",
    //                 justifyContent: "center",
    //             },
    //             {
    //                 width: size,
    //                 height: size,
    //                 transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
    //             },
    //         ]}
    //     >
    //         <Image
    //             source={require("../../assets/back-chevron.png")}
    //             style={[
    //                 {
    //                     resizeMode: "contain",
    //                 },
    //                 { tintColor: color, width: iosIconSize, height: iosIconSize },
    //             ]}
    //         />
    //     </View>
    // ) : (
    //     <ArrowLeftIcon
    //         color={color}
    //         size={size}
    //         direction={I18nManager.isRTL ? "rtl" : "ltr"}
    //     />
    // );

    return (
        <ArrowLeftIcon
            color={color}
            size={size}
            direction={I18nManager.isRTL ? "rtl" : "ltr"}
        />
    );
};

export default AppbarBackIcon;

// @component-docs ignore-next-line
export { AppbarBackIcon };
