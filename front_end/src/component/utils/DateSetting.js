import { DateTime, Interval, fromDateTimes } from 'luxon';
import React, { useState, useEffect } from 'react';
import { setCurretnWeekDateData } from '../../actions';

// this function aim to set into the redux stor the week data such as:
// current week full dates in local format 
// the curretn week number 
// 

function DateSetting  (dispatch) {
    const [startWeekDate, setStartWeekDate] = useState('');

    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    //    i need to get date, and to see what date ar we then set the week range. 

    const getCurrentDate = DateTime.now().plus({'day':3});
    console.log("getCurrentDate",getCurrentDate.weekday);

    const setDate = getCurrentDate;

    const setWeekRange =(currentDay) =>{
        
        if(currentDay.weekday === 7){
            const weekEndDate = currentDay.plus({'day':6});
            const weekStartDate = currentDay;
            
            const week_days_dates = Interval.fromDateTimes(
                weekStartDate.startOf('day'),
                weekEndDate.endOf('day')
            )
            .splitBy({'day':1})
            .map((date)=> date.start.toISODate());

            console.log("intervale week range ", week_days_dates);
            // console.log("sunday it is");
        }else{
            console.log("its naother day ");
            
        }
    };setWeekRange(getCurrentDate);

    const date = setDate.toISO();
    console.log("setDate local***8 ", setDate);

    const dayOfMonth = setDate.day;

    const weekDay = setDate.weekday  === 7 ? 0  : setDate.weekday;
    const currentMonth = setDate.month;
    const currentWeekNumber = setDate.weekNumber  ;
    console.log("setsetDate local ", currentWeekNumber);

    const startDay = dayOfMonth - weekDay;
    const weekDates = days.map((day, index) => {
        return { day, value: (`${startDay + index}/${currentMonth}`) };
      });
      const currentWeekDateData = {currentWeekNumber, weekDates}


    console.log(currentWeekDateData);
    dispatch(setCurretnWeekDateData(currentWeekDateData))
    // setWeekNumber(currentWeekNumber)
    // setCurrentWeek({currentWeekNumber, weekDates});


  };


  export default DateSetting;