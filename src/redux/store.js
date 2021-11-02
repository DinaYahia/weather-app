import { createStore, combineReducers } from "redux";
import cityTempReducer from './reducers/cityTemp'

const rootReducer = combineReducers({
    cityTemp:cityTempReducer
})

const store = createStore(rootReducer);

export default store;