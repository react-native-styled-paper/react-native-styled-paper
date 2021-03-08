import _ from "lodash";
import XDate from "xdate";
import React, { Component, Fragment } from "react";
import { ActivityIndicator, Platform, View, Text, TouchableOpacity, Image } from "react-native";
import { shouldUpdate } from "../../component-updater";
import dateutils from "../../dateutils";
import { testIDs } from "../../testIDs";
import styleConstructor from "./style";

type Props = {
    theme?: Record<string, any>,
    firstDay?: number,
    displayLoadingIndicator?: boolean,
    showWeekNumbers?: boolean,
    month?: XDate,
    addMonth?: (d?) => void,
    /** Month format in the title. Formatting values: http://arshaw.com/xdate/#Formatting */
    monthFormat?: string,
    /**  Hide day names. Default = false */
    hideDayNames?: boolean,
    /** Hide month navigation arrows. Default = false */
    hideArrows?: boolean,
    /** Replace default arrows with custom ones (direction can be 'left' or 'right') */
    renderArrow?: (evt?) => React.ReactNode,
    /** Handler which gets executed when press arrow icon left. It receive a callback can go back month */
    onPressArrowLeft?: (evt?, m?) => void,
    /** Handler which gets executed when press arrow icon right. It receive a callback can go next month */
    onPressArrowRight?: (evt?, m?) => void,
    /** Disable left arrow. Default = false */
    disableArrowLeft?: boolean,
    /** Disable right arrow. Default = false */
    disableArrowRight?: boolean,
    /** Apply custom disable color to selected day indexes */
    disabledDaysIndexes?: number[],
    /** Replace default month and year title with custom one. the function receive a date as parameter. */
    renderHeader?: any,
    /** Provide aria-level for calendar heading for proper accessibility when used with web (react-native-web) */
    webAriaLevel?: number,

    testID?: string,

    style?: Record<string, any>,
    accessibilityElementsHidden?: any,
    importantForAccessibility?: any,
};

class CalendarHeader extends Component<Props> {
    static displayName = "IGNORE";

    static defaultProps = {
        monthFormat: "MMMM yyyy",
        webAriaLevel: 1
    };

    style: Record<string, any>;
    indicatorColor;

    constructor(props) {
        super(props);

        this.style = styleConstructor(props.theme);
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.month.toString("yyyy MM") !== this.props.month.toString("yyyy MM")) {
            return true;
        }
        return shouldUpdate(this.props, nextProps, [
            "displayLoadingIndicator",
            "hideDayNames",
            "firstDay",
            "showWeekNumbers",
            "monthFormat",
            "renderArrow",
            "disableArrowLeft",
            "disableArrowRight"
        ]);
    }

    addMonth = () => {
        const { addMonth } = this.props;
        addMonth(1);
    };

    subtractMonth = () => {
        const { addMonth } = this.props;
        addMonth(-1);
    };

    onPressLeft = () => {
        const { onPressArrowLeft, month } = this.props;

        if (typeof onPressArrowLeft === "function") {
            return onPressArrowLeft(this.subtractMonth, month);
        }
        return this.subtractMonth();
    };

    onPressRight = () => {
        const { onPressArrowRight, month } = this.props;

        if (typeof onPressArrowRight === "function") {
            return onPressArrowRight(this.addMonth, month);
        }
        return this.addMonth();
    };

    renderWeekDays = weekDaysNames => {
        const { disabledDaysIndexes } = this.props;

        return weekDaysNames.map((day, idx) => {
            const dayStyle = [this.style.dayHeader];

            if (_.includes(disabledDaysIndexes, idx)) {
                dayStyle.push(this.style.disabledDayHeader);
            }

            return (
                <Text allowFontScaling={false} key={idx} style={dayStyle} numberOfLines={1} accessibilityLabel={""}>
                    {day}
                </Text>
            );
        });
    };

    renderHeader = () => {
        const { renderHeader, month, monthFormat, testID, webAriaLevel } = this.props;
        const webProps = Platform.OS === "web" ? { "aria-level": webAriaLevel } : {};

        if (renderHeader) {
            return renderHeader(month);
        }

        return (
            <Fragment>
                <Text
                    allowFontScaling={false}
                    style={this.style.monthText}
                    testID={testID ? `${testIDs.HEADER_MONTH_NAME}-${testID}` : testIDs.HEADER_MONTH_NAME}
                    {...webProps}
                >
                    {month.toString(monthFormat)}
                </Text>
            </Fragment>
        );
    };

    renderArrow(direction) {
        const { hideArrows, disableArrowLeft, disableArrowRight, renderArrow, testID } = this.props;
        if (hideArrows) {
            return <View />;
        }
        const isLeft = direction === "left";
        const id = isLeft ? testIDs.CHANGE_MONTH_LEFT_ARROW : testIDs.CHANGE_MONTH_RIGHT_ARROW;
        const testId = testID ? `${id}-${testID}` : id;
        const onPress = isLeft ? this.onPressLeft : this.onPressRight;
        const imageSource = isLeft ? require("../img/previous.png") : require("../img/next.png");
        const renderArrowDirection = isLeft ? "left" : "right";
        const shouldDisable = isLeft ? disableArrowLeft : disableArrowRight;

        return (
            <TouchableOpacity
                onPress={!shouldDisable ? onPress : undefined}
                disabled={shouldDisable}
                style={this.style.arrow}
                hitSlop={{ left: 20, right: 20, top: 20, bottom: 20 }}
                testID={testId}
            >
                {renderArrow ? (
                    renderArrow(renderArrowDirection)
                ) : (
                    <Image source={imageSource} style={shouldDisable ? this.style.disabledArrowImage : this.style.arrowImage} />
                )}
            </TouchableOpacity>
        );
    }

    renderIndicator() {
        const { displayLoadingIndicator, theme, testID } = this.props;

        if (displayLoadingIndicator) {
            return (
                <ActivityIndicator
                    color={theme && theme.indicatorColor}
                    testID={testID ? `${testIDs.HEADER_LOADING_INDICATOR}-${testID}` : testIDs.HEADER_LOADING_INDICATOR}
                />
            );
        }
    }

    renderDayNames() {
        const { firstDay, hideDayNames, showWeekNumbers, testID } = this.props;
        const weekDaysNames = dateutils.weekDayNames(firstDay);

        if (!hideDayNames) {
            return (
                <View style={this.style.week} testID={testID ? `${testIDs.HEADER_DAY_NAMES}-${testID}` : testIDs.HEADER_DAY_NAMES}>
                    {showWeekNumbers && <Text allowFontScaling={false} style={this.style.dayHeader}></Text>}
                    {this.renderWeekDays(weekDaysNames)}
                </View>
            );
        }
    }

    render() {
        const { style, testID } = this.props;

        return (
            <View
                testID={testID}
                style={style}
                accessible
                accessibilityRole={"adjustable"}
                accessibilityActions={[
                    { name: "increment", label: "increment" },
                    { name: "decrement", label: "decrement" }
                ]}
                onAccessibilityAction={this.onAccessibilityAction}
                accessibilityElementsHidden={this.props.accessibilityElementsHidden} // iOS
                importantForAccessibility={this.props.importantForAccessibility} // Android
            >
                <View style={this.style.header}>
                    {this.renderArrow("left")}
                    <View style={this.style.headerContainer}>
                        {this.renderHeader()}
                        {this.renderIndicator()}
                    </View>
                    {this.renderArrow("right")}
                </View>
                {this.renderDayNames()}
            </View>
        );
    }

    onAccessibilityAction = event => {
        switch (event.nativeEvent.actionName) {
        case "decrement":
            this.onPressLeft();
            break;
        case "increment":
            this.onPressRight();
            break;
        default:
            break;
        }
    };
}

export default CalendarHeader;
