import { ComponentDriver, getTextNodes } from "react-component-driver";
import CalendarHeader from ".";
import {
    testIDs,
} from "../../testIDs";

type Props = {

}

export class CalendarHeaderDriver extends ComponentDriver<Props> {

    testID;

    constructor(testID) {
        super(CalendarHeader);
        this.testID = testID;
    }

    getTitle() {
        return getTextNodes(this.getByID(this.getTestID(testIDs.HEADER_MONTH_NAME))).join("");
    }

    getDayNames() {
        return getTextNodes(this.getByID(this.getTestID(testIDs.HEADER_DAY_NAMES)));
    }

    getLoadingIndicator() {
        return this.getByID(this.getTestID(testIDs.HEADER_LOADING_INDICATOR));
    }

    getLeftArrow() {
        return this.getByID(this.getTestID(testIDs.CHANGE_MONTH_LEFT_ARROW));
    }

    getRightArrow() {
        return this.getByID(this.getTestID(testIDs.CHANGE_MONTH_RIGHT_ARROW));
    }

    tapLeftArrow() {
        const node = this.getLeftArrow();
        if (!node) {
            throw new Error("Left arrow not found.");
        }
        node.props.onClick();
        return this;
    }

    tapRightArrow() {
        const node = this.getRightArrow();
        if (!node) {
            throw new Error("Right arrow not found.");
        }
        node.props.onClick();
        return this;
    }

    getTestID(testID) {
        return this.testID ? `${testID}-${this.testID}` : testID;
    }
}
