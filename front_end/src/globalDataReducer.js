const initialState={
    slotsTypes : [],
}

const globalDataReducer = (state= initialState, action)=>{

    switch(action.type){

    case 'SET_SLOTS_TYPES':
        console.log("SET_SLOTS_TYPES", action);
        return {
        ...state,
        slotsTypes: action.payload
    };
    default :
        return { ...state}
    };
    
};

export default globalDataReducer;
