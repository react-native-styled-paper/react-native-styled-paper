import * as React from "react";
import { View } from "react-native";
import { shouldUpdate, extractComponentProps } from "../../../component-updater";
import styleConstructor from "./style";
import Dot from "../dot";

const MARKING_TYPES = {
    dot: "dot",
    multiDot: "multi-dot",
    period: "period",
    multiPeriod: "multi-period",
    custom: "custom"
};

// type DOT = {
//     key: string,
//     color: string,
//     selectedDotColor: string
// };

// type PERIOD = {
//     startingDay: boolean,
//     endingDay: boolean,
//     color: string
// };

type Props = typeof Dot & {
    // type?: oneOf(Object.values(MARKING_TYPES)),
    type?: any,
    theme?: Record<string, any>,
    selected?: boolean,
    marked?: boolean,
    today?: boolean,
    disabled?: boolean,
    disableTouchEvent?: boolean,
    activeOpacity?: number,
    selectedColor?: string,
    selectedTextColor?: string,
    dotColor?: string,
    //multi-dot
    // dots?: arrayOf(shape(DOT)),
    dots?: any[],
    //multi-period
    // periods?: arrayOf(shape(PERIOD)),
    periods?: any[],
};

export default class Marking extends React.Component<Props> {
    static displayName = "IGNORE";

    static markingTypes = MARKING_TYPES;

    style;

    constructor(props) {
        super(props);

        this.style = styleConstructor(props.theme);
    }

    shouldComponentUpdate(nextProps) {
        return shouldUpdate(this.props, nextProps, [
            "type",
            "selected",
            "marked",
            "today",
            "disabled",
            "disableTouchEvent",
            "activeOpacity",
            "selectedColor",
            "selectedTextColor",
            "dotColor",
            "dots",
            "periods"
        ]);
    }

    getItems(items) {
        const { type } = this.props;

        if (items && Array.isArray(items) && items.length > 0) {
            // Filter out items so that we process only those which have color property
            const validItems = items.filter(d => d && d.color);

            return validItems.map((item, index) => {
                return type === MARKING_TYPES.multiDot ? this.renderDot(index, item) : this.renderPeriod(index, item);
            });
        }
    }

    renderMarkingByType() {
        const { type, dots, periods } = this.props;

        switch (type) {
        case MARKING_TYPES.multiDot:
            return this.renderMultiMarkings(this.style.dots, dots);
        case MARKING_TYPES.multiPeriod:
            return this.renderMultiMarkings(this.style.periods, periods);
        default:
            return this.renderDot();
        }
    }

    renderMultiMarkings(containerStyle, items) {
        return (
            <View style={containerStyle}>
                {this.getItems(items)}
            </View>
        );
    }

    renderPeriod(index, item) {
        const { color, startingDay, endingDay } = item;
        const style = [
            this.style.period,
            {
                backgroundColor: color
            }
        ];
        if (startingDay) {
            style.push(this.style.startingDay);
        }
        if (endingDay) {
            style.push(this.style.endingDay);
        }
        return <View key={index} style={style} />;
    }

    renderDot(index?, item?) {
        const { selected, dotColor } = this.props;
        const dotProps = extractComponentProps(Dot, this.props);
        let key = index;
        let color = dotColor;

        if (item) {
            if (item.key) {
                key = item.key;
            }
            color = selected && item.selectedDotColor ? item.selectedDotColor : item.color;
        }

        return (
            <Dot
                {...dotProps}
                key={key}
                color={color}
            />
        );
    }

    render() {
        return this.renderMarkingByType();
    }
}
