import { ComponentDriver } from "react-component-driver";
import Day from ".";
import { extractStyles } from "../../../test";

type Props = {

};
export default class BasicDayDriver extends ComponentDriver<Props> {

    constructor() {
        super(Day);
    }

    tap() {
        (this.getComponent() as any).props.onClick();
        return this;
    }

    getAccessibilityLabel() {
        return (this.getComponent() as any).props.accessibilityLabel.trim();
    }

    getStyle() {
        return extractStyles(this.getComponent());
    }

    getTextView() {
        return (this.getComponent() as any).children.find(node => node.type === "Text");
    }

    getTextStyle() {
        return extractStyles(this.getTextView());
    }
}
