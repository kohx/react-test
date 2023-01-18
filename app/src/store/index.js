import countReducer from "@/store/countReducer";
import postsReducer from "@/store/postsReducer";
import { createStore, combineReducers } from 'redux';

const rootReducer = combineReducers({
    countReducer,
    postsReducer,
})

// Rudex: ストアの作成
const store = createStore(rootReducer);
console.log(store.getState());

export default store;