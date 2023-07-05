import RootReducer from "./RootReducer";

import storage from "redux-persist/lib/storage"
import {persistReducer, persistStore} from "redux-persist"
import {configureStore} from "@reduxjs/toolkit"

const persistConfig = {
    key: "root",
    storage,
}

const persistedReducer = persistReducer(persistConfig, RootReducer)

const store = configureStore({
    reducer: persistedReducer
})

const persistor = persistStore(store)

export {store, persistor}