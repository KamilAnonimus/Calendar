import { configureStore } from "@reduxjs/toolkit"
import CalendarSlice from "./reducers/SliderSlises";
import { combineReducers } from "redux";

const rootReducer = combineReducers({CalendarSlice})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']