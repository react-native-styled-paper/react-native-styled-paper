import XDate from "xdate";

function sameMonth(a, b) {
    return a instanceof XDate && b instanceof XDate &&
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth();
}

function sameDate(a, b) {
    return a instanceof XDate && b instanceof XDate &&
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate();
}

function isGTE(a, b) {
    return b.diffDays(a) > -1;
}

function isLTE(a, b) {
    return a.diffDays(b) > -1;
}

function fromTo(a, b) {
    const days = [];
    let from = +a;
    const to = +b;
    for (; from <= to; from = new XDate(from, true).addDays(1).getTime()) {
        days.push(new XDate(from, true));
    }
    return days;
}

function month(xd) {
    const year = xd.getFullYear(), month = xd.getMonth();
    const days = new Date(year, month + 1, 0).getDate();

    const firstDay = new XDate(year, month, 1, 0, 0, 0, true);
    const lastDay = new XDate(year, month, days, 0, 0, 0, true);

    return fromTo(firstDay, lastDay);
}

function weekDayNames(firstDayOfWeek = 0) {
    let weekDaysNames = XDate.locales[XDate.defaultLocale].dayNamesShort;
    const dayShift = firstDayOfWeek % 7;
    if (dayShift) {
        weekDaysNames = weekDaysNames.slice(dayShift).concat(weekDaysNames.slice(0, dayShift));
    }
    return weekDaysNames;
}

function page(xd, firstDayOfWeek, showSixWeeks?) {
    const days = month(xd);
    let before = [], after = [];

    const fdow = ((7 + firstDayOfWeek) % 7) || 7;
    const ldow = (fdow + 6) % 7;

    firstDayOfWeek = firstDayOfWeek || 0;

    const from = days[0].clone();
    const daysBefore = from.getDay();

    if (from.getDay() !== fdow) {
        from.addDays(-(from.getDay() + 7 - fdow) % 7);
    }

    const to = days[days.length - 1].clone();
    const day = to.getDay();
    if (day !== ldow) {
        to.addDays((ldow + 7 - day) % 7);
    }

    const daysForSixWeeks = (((daysBefore + days.length) / 6) >= 6);

    if (showSixWeeks && !daysForSixWeeks) {
        to.addDays(7);
    }

    if (isLTE(from, days[0])) {
        before = fromTo(from, days[0]);
    }

    if (isGTE(to, days[days.length - 1])) {
        after = fromTo(days[days.length - 1], to);
    }

    return before.concat(days.slice(1, days.length - 1), after);
}

function isDateNotInTheRange(minDate, maxDate, date) {
    return (minDate && !isGTE(date, minDate)) || (maxDate && !isLTE(date, maxDate));
}


const dateutils = {
    weekDayNames,
    sameMonth,
    sameDate,
    month,
    page,
    fromTo,
    isLTE,
    isGTE,
    isDateNotInTheRange
};

export default dateutils;