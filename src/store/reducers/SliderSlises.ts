import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface informationInCalendar {
    idMount: number
    nameEventForDisplayInTasks: string
    descriptionEventForDisplayInTasks: string
}

const initialState: informationInCalendar = {
    idMount: new Date().getMonth(),
    nameEventForDisplayInTasks: '',
    descriptionEventForDisplayInTasks: ''
}

export const CalendarSlice = createSlice({
    name:'Mount',
    initialState,
    reducers: {
        increment(state, action: PayloadAction<number>) {
            state.idMount = action.payload;
        },
        eventName(state, action: PayloadAction<string>) {
            state.nameEventForDisplayInTasks = action.payload;
        },
        eventDescription(state, action: PayloadAction<string>) {
            state.descriptionEventForDisplayInTasks = action.payload;
        }
    },
})

export default CalendarSlice.reducer;