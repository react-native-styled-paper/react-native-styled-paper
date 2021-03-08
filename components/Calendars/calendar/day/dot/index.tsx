import * as React from "react";
import { View } from "react-native";
import styleConstructor from "./style";

type Props = {
    theme?: Record<string, any>,
    color?: string,
    marked?: boolean,
    selected?: boolean,
    disabled?: boolean,
    today?: boolean,
};

const Dot = ({ theme, marked, disabled, color, today, selected }: Props) => {
    const style = styleConstructor(theme);
    const dotStyle = [style.dot];

    if (marked) {
        dotStyle.push(style.visibleDot);

        if (today) {
            dotStyle.push(style.todayDot);
        }

        if (disabled) {
            dotStyle.push(style.disabledDot);
        }

        if (selected) {
            dotStyle.push(style.selectedDot);
        }

        if (color) {
            dotStyle.push({ backgroundColor: color });
        }
    }

    return <View style={dotStyle} />;
};

export default Dot;
