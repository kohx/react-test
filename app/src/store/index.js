import countReducer from "@/store/countReducer";
import entriesReducer from "@/store/entriesReducer";
import userReducer from "@/store/userReducer";
import { createStore, combineReducers } from 'redux';

const rootReducer = combineReducers({
    countReducer,
    entriesReducer,
    userReducer,
})

// Rudex: ストアの作成
const store = createStore(rootReducer);

export default store;