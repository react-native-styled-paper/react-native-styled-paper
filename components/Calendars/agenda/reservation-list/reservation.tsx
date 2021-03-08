import _ from "lodash";
import XDate from "xdate";
import * as React from "react";
import { View, Text } from "react-native";
import { xdateToData } from "../../interface";
import dateutils from "../../dateutils";
import { testIDs } from "../../testIDs";
import styleConstructor from "./style";

type Props = {
    item: any,
    /** Specify theme properties to override specific styles for reservation parts. Default = {} */
    theme: Record<string, any>,
    /** specify your item comparison function for increased performance */
    rowHasChanged: (evt?, d?) => boolean,
    /** specify how each date should be rendered. day can be undefined if the item is not first in that day */
    renderDay: (evt?, d?) => React.ReactNode,
    /** specify how each item should be rendered in agenda */
    renderItem: (evt?, d2?) => React.ReactNode,
    /** specify how empty date content with no items should be rendered */
    renderEmptyDate: (evt?) => React.ReactNode,
};

class Reservation extends React.Component<Props> {

    static displayName = "IGNORE";

    style: Record<string, any>;

    constructor(props) {
        super(props);

        this.style = styleConstructor(props.theme);
    }

    shouldComponentUpdate(nextProps) {
        const r1 = this.props.item;
        const r2 = nextProps.item;
        let changed = true;

        if (!r1 && !r2) {
            changed = false;
        } else if (r1 && r2) {
            if (r1.day.getTime() !== r2.day.getTime()) {
                changed = true;
            } else if (!r1.reservation && !r2.reservation) {
                changed = false;
            } else if (r1.reservation && r2.reservation) {
                if ((!r1.date && !r2.date) || (r1.date && r2.date)) {
                    if (_.isFunction(this.props.rowHasChanged)) {
                        changed = this.props.rowHasChanged(r1.reservation, r2.reservation);
                    }
                }
            }
        }
        return changed;
    }

    renderDate(date, item) {
        if (_.isFunction(this.props.renderDay)) {
            return this.props.renderDay(date ? xdateToData(date) : undefined, item);
        }

        const today = dateutils.sameDate(date, XDate()) ? this.style.today : undefined;
        if (date) {
            return (
                <View style={this.style.day} testID={testIDs.RESERVATION_DATE}>
                    <Text allowFontScaling={false} style={[this.style.dayNum, today]}>
                        {date.getDate()}
                    </Text>
                    <Text allowFontScaling={false} style={[this.style.dayText, today]}>
                        {XDate.locales[XDate.defaultLocale].dayNamesShort[date.getDay()]}
                    </Text>
                </View>
            );
        } else {
            return <View style={this.style.day} />;
        }
    }

    render() {
        const { reservation, date } = this.props.item;
        let content;

        if (reservation) {
            const firstItem = date ? true : false;
            if (_.isFunction(this.props.renderItem)) {
                content = this.props.renderItem(reservation, firstItem);
            }
        } else if (_.isFunction(this.props.renderEmptyDate)) {
            content = this.props.renderEmptyDate(date);
        }

        return (
            <View style={this.style.container}>
                {this.renderDate(date, reservation)}
                <View style={this.style.innerContainer}>{content}</View>
            </View>
        );
    }
}

export default Reservation;
