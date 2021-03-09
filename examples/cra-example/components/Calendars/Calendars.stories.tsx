import * as React from "react";
import { storiesOf } from "@storybook/react";
import AgendaExample from "./agenda";
import CalendarsExample from "./calendars";
import CalendarsListExample from "./calendarsList";

storiesOf("Calendars", module)
    .add("Agenda", () => {

        return (
            <AgendaExample
            />
        )
    })
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
