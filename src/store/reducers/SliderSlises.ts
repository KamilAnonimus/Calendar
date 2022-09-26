import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface informationInCalendar {
    idMount: number
}

const initialState: informationInCalendar = {
    idMount: new Date().getMonth()
}

export const CalendarSlice = createSlice({
    name:'Mount',
    initialState,
    reducers: {
        increment(state, action: PayloadAction<number>) {
            state.idMount = action.payload;
        }
    }
})

export default CalendarSlice.reducer;