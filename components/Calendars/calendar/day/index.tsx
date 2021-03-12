// import _ from "lodash";
import XDate from "xdate";
import * as React from "react";
import { shouldUpdate, extractComponentProps } from "../../component-updater";
import { xdateToData } from "../../interface";
import { testIDs } from "../../testIDs";
import BasicDay from "./basic";
import PeriodDay from "./period";
import { StyleProp } from "react-native";

type Props = StyleProp<BasicDay> & {
    /** The day to render */
    day?: any,
    /** Provide custom day rendering component */
    dayComponent?: any,

    marking?: any,

    state?: any,

    markingType?: any,
};
export default class Day extends React.Component<Props> {
    static displayName = "IGNORE";

    shouldComponentUpdate(nextProps) {
        return shouldUpdate(this.props, nextProps, ["day", "dayComponent", "markingType", "marking", "onPress", "onLongPress"]);
    }

    getMarkingLabel(at?) {
        const { marking } = this.props;
        let label = "";

        if (marking.accessibilityLabel) {
            return marking.accessibilityLabel;
        }

        if (marking.selected) {
            label += "selected ";
            if (!marking.marked) {
                label += "You have no entries for this day ";
            }
        }
        if (marking.marked) {
            label += "You have entries for this day ";
        }
        if (marking.startingDay) {
            label += "period start ";
        }
        if (marking.endingDay) {
            label += "period end ";
        }
        if (marking.disabled || marking.disableTouchEvent) {
            label += "disabled ";
        }
        return label;
    }

    getAccessibilityLabel = (day) => {
        const { state } = this.props;
        const today = XDate.locales[XDate.defaultLocale].today;
        const isToday = state === "today"; //TODO: check if 'day' equals 'today' and remove 'state' check
        const formatAccessibilityLabel = XDate.locales[XDate.defaultLocale].formatAccessibilityLabel;
        const markingLabel = this.getMarkingLabel(day);

        if (formatAccessibilityLabel) {
            return `${isToday ? today : ""} ${day.toString(formatAccessibilityLabel)} ${markingLabel}`;
        }

        return `${isToday ? "today" : ""} ${day.toString("dddd d MMMM yyyy")} ${markingLabel}`;
    };

    getDayComponent() {
        const { dayComponent, markingType } = this.props;

        if (dayComponent) {
            return dayComponent;
        }
        return markingType === "period" ? PeriodDay : BasicDay;
    }

    render() {
        const { day } = this.props;
        const date = xdateToData(day);
        const Component = this.getDayComponent();
        const dayProps = extractComponentProps(Component, this.props);

        return (
            <Component
                {...dayProps}
                date={date}
                testID={`${testIDs.SELECT_DATE_SLOT}-${date.dateString}`}
                accessibilityLabel={this.getAccessibilityLabel(day)}
            >
                {date ? day.getDate() : day}
            </Component>
        );
    }
}
