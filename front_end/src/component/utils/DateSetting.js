import { DateTime, Interval, fromDateTimes } from 'luxon';
import React, { useState, useEffect } from 'react';
import { setCurretnWeekDateData } from '../../actions';

// this function aim to set into the redux stor the week data such as:
// current week full dates in local format 
// the curretn week number 
// 

function DateSetting  (dispatch) {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    //    i need to get date, and to see what date ar we then set the week range. 

    const getCurrentDate = DateTime.now().plus({"day":1});
    const setDate = getCurrentDate;
    console.log("setDate",setDate);

    const setWeekRange =(currentDay) =>{

        console.log("current Date question", currentDay.weekday);
        const weekStartDate = currentDay.weekday  ;
        const weekEndDate = currentDay.plus({'day':6});
       
            
            const week_days_dates = Interval.fromDateTimes(
                weekStartDate.startOf('day'),
                weekEndDate.endOf('day')
            )
            .splitBy({'day':1})
            .map((date)=>{
                return {
                    day_date :  date.start.toString(),
                    day_name :  date.start.weekdayLong
                }
            });
                // console.log("week_days_dates", week_days_dates);
            return week_days_dates;
            // console.log("sunday it is");
        if(currentDay.weekday === 7){

            
        }else{
            console.log("its naother day ");
            
        }
    };

    const getWeekDays = setWeekRange(setDate);
    console.log("getWeekDays",getWeekDays);
    // const date = setDate.toISO();

    // const dayOfMonth = setDate.day;

    // const weekDay = setDate.weekday  === 7 ? 0  : setDate.weekday;
    // const currentMonth = setDate.month;
    const currentWeekNumber = setDate.weekNumber  ;

    // const startDay = dayOfMonth - weekDay;
    const weekDates = getWeekDays.map((day, index) => {
        console.log("index in loop", index);
        return day;
      });
      const currentWeekDateData = {currentWeekNumber, weekDates}


    dispatch(setCurretnWeekDateData(currentWeekDateData))
    // setWeekNumber(currentWeekNumber)
    // setCurrentWeek({currentWeekNumber, weekDates});


  };


  export default DateSetting;