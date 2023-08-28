const initialState = {
    userCurrentWeekData: null,
};


const userReducer = (state = initialState, action) => {
    

    switch (action.type) {
        case 'SET_USER_CURRENT_WEEK_DATA':
            console.log("SET_USER_CURRENT_WEEK_DATA", action);
            return {
            ...state,
            userCurrentWeekData: action.payload
        };

       
        default :
            return state;    
        }

};

export default userReducer