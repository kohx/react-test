import countReducer from "@/store/countReducer";
import entriesReducer from "@/store/entriesReducer";
import userReducer from "@/store/userReducer";
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const reducer = combineReducers({
    countReducer,
    entriesReducer,
    userReducer,
})

// Rudex: ストアの作成
const store = createStore(
    reducer,
    // * redux-thunk
    // applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

export default store;