const initialState={
    slotsTypes : [],
    currentWeekDateData : {
        currentWeekNumber: null , 
        weekDates :[]
    }
}

const globalDataReducer = (state= initialState, action)=>{

    switch(action.type){

    case 'SET_SLOTS_TYPES':
        console.log("SET_SLOTS_TYPES", action);
        return {
        ...state,
        slotsTypes: action.payload
    };

    case 'SET_CURRENT_WEEK_DATE_DATA':
        console.log("dispatch from DateSettings", action.payload);
        return{
        ...state,
        currentWeekDateData: action.payload
        }

    default :
        return { ...state}
    };
    
};

export default globalDataReducer;
