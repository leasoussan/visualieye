import { DateTime, Interval, fromDateTimes } from 'luxon';
import React, { useState, useEffect } from 'react';

// this function aim to set into the redux stor the week data such as:
// current week full dates in local format 
// the curretn week number 
// 

function DateSetting() {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    //    i need to get date, and to see what date ar we then set the week range. 

    const getCurrentDate = DateTime.now();
    const setDate = getCurrentDate;


    const setWeekRange = (currentDay) => {
        const weekStartDate = currentDay;
        const weekEndDate = currentDay.plus({ 'day': 6 });

        const week_days_dates = Interval.fromDateTimes(
            weekStartDate.startOf('day'),
            weekEndDate.endOf('day')
        )
            .splitBy({ 'day': 1 })
            .map((date) => {
                return {
                    day_date: date.start.toString(),
                    day_name: date.start.weekdayLong
                }
            });
        // console.log("week_days_dates", week_days_dates);
        return week_days_dates;

        if (currentDay.weekday === 7) {


        } else {
            console.log("its naother day ");

        }
    };

    const getWeekDays = setWeekRange(setDate);
    console.log("getWeekDays", getWeekDays);

    const currentWeekNumber = setDate.weekNumber;

    const weekDates = getWeekDays.map((day, index) => {
        console.log("index in loop", day);
        return day;
    });

    const currentWeekDateData = { currentWeekNumber, weekDates }

    return currentWeekDateData

};


export default DateSetting;