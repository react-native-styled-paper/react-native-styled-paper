import * as React from "react";
import hoistNonReactStatic from "hoist-non-react-statics";
import CalendarContext from "./calendarContext";

function asCalendarConsumer(WrappedComponent) {

    const CalendarConsumer = (props) => {
        const contentRef = React.createRef();

        return (
            <CalendarContext.Consumer>
                {(context) => (
                    <WrappedComponent
                        ref={contentRef}
                        context={context}
                        {...props}
                    />
                )}
            </CalendarContext.Consumer>
        );
    }

    hoistNonReactStatic(CalendarConsumer, WrappedComponent);

    return CalendarConsumer;
}

export default asCalendarConsumer;
