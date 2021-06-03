import * as React from "react";
import { screenSize } from "./utils/ScreenSize";
import { isHidden, getComponentWidth, getComponentOffset } from "./utils/helpers";
import { View } from "react-native";

type Props = {
    sm?: number,
    smOffset?: number,
    smHidden?: boolean,
    md?: number,
    mdOffset?: number,
    mdHidden?: boolean,
    lg?: number,
    lgOffset?: number,
    lgHidden?: boolean,
    rowSize?: number,
    style?: any,
    children: React.ReactNode,
};

const Column = (props: Props) => {
    const {
        sm,
        smOffset,
        smHidden,
        md,
        mdOffset,
        mdHidden,
        lg,
        lgOffset,
        lgHidden,
        rowSize,
        ...rest
    } = props;

    const gridProps = {
        sm,
        smOffset,
        smHidden,
        md,
        mdOffset,
        mdHidden,
        lg,
        lgOffset,
        lgHidden,
        rowSize
    };

    if (isHidden(screenSize, gridProps)) {
        return null;
    } else {
        return (
            <View
                {...rest}
                style={[
                    props.style, {
                        display: "flex",
                        width: getComponentWidth(screenSize, gridProps),
                        flexDirection: "column",
                        backgroundColor: "transparent",
                        marginLeft: getComponentOffset(screenSize, gridProps)
                    }]
                }
                testID="column"
            >
                {rest.children}
            </View>
        );
    }
};

export default Column;
