import { configureStore } from "@reduxjs/toolkit";
import dogReducer from "./dogSlice";

import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    version: 1,
    storage,
};

const reducers = combineReducers({
    dog: dogReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
    reducer: persistedReducer,
    middleware: [thunk],
});

// export default configureStore({
//     reducer: {
//         dog: dogReducer,
//     },
// });
