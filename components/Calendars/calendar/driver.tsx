import { ComponentDriver, getTextNodes } from "react-component-driver";
import { swipeDirections } from "react-native-swipe-gestures";
import Calendar from ".";
import { BasicDayDriver } from "./day/basic/driver";
import { CalendarHeaderDriver } from "./header/driver";
import { testIDs } from "../testIDs";

type Props = {
    onSwipe?: (evt?) => void,
};

export class CalendarDriver extends ComponentDriver<Props> {

    testID;

    constructor(testID = "calendar") {
        super(Calendar as any);
        this.testID = testID;
    }

    withDefaultProps(props) {
        return this.setProps({ testID: this.testID, ...props });
    }

    isRootGestureRecognizer() {
        return !!(this.getComponent() as any).props.onSwipe;
    }

    swipe(direction, state?) {
        (this.getComponent() as any).props.onSwipe(direction, state);
        return this;
    }

    swipeLeft() {
        this.swipe(swipeDirections.SWIPE_LEFT);
        return this;
    }

    swipeRight() {
        this.swipe(swipeDirections.SWIPE_RIGHT);
        return this;
    }

    getHeader() {
        const node = this.getByID(this.testID);
        if (!node) {
            throw new Error("Header not found.");
        }
        return new CalendarHeaderDriver(this.testID).attachTo(node);
    }

    getDay(dateString, type = "basic") {
        const node = this.getByID(`${testIDs.SELECT_DATE_SLOT}-${dateString}`);
        if (!node) {
            throw new Error(`Date ${dateString} not found.`);
        }

        let dayDriver;
        switch (type) {
        case "basic":
            dayDriver = new BasicDayDriver();
            break;
        default:
            throw new Error(`Day type ${type} is not supported.`);
        }

        return dayDriver.attachTo(node);
    }

    getDays() {
        return getTextNodes(this.filterByID(new RegExp(testIDs.SELECT_DATE_SLOT)));
    }

    getWeekNumbers() {
        return getTextNodes(this.filterByID(new RegExp(testIDs.WEEK_NUMBER)));
    }
}
