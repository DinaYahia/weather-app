const initialState = {
    cityName: "",
};
  
const cityTempReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CHANGE_CITY_NAME":
            console.log(action.payload,'action.payload');
            return { ...state, cityName: action.payload };
        default:
            return state;
    }
};
  
export default cityTempReducer