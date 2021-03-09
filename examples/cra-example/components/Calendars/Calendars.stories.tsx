import * as React from "react";
import { storiesOf } from "@storybook/react";
import CalendarsExample from "./calendars";
import CalendarsListExample from "./calendarsList";

storiesOf("Calendars", module)
    .add("Calendars", () => {

        return (
            <CalendarsExample
            />
        )
    })
    .add("CalendarsList", () => {

        return (
            <CalendarsListExample
            />
        )
    })
