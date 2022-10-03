import { useAppSelector } from "../hooks/redux";

export default function TaskInCalendar(props:any) {
    function creatingAnEvent(){
        let inputValueNameEvent = (document.getElementById('homepage__tasks__Name-event') as HTMLInputElement).value;
        let inputValueDescriptionEvent = (document.getElementById('homepage__tasks__Description-event') as HTMLInputElement).value;
        let eventDayNumber = props.informationDay
        let eventMount = props.informationMounth
        let eventYear = props.informationYear
        localStorage.setItem(`NameEvent${eventDayNumber}${eventMount}${eventYear}`, inputValueNameEvent)
        localStorage.setItem(`DescriptionEvent${eventDayNumber}${eventMount}${eventYear}`, inputValueDescriptionEvent)
    }
    return (
        <div className="homepage__tasks">
            <div>Create an event</div>
            <input maxLength={10} placeholder="Name event" id="homepage__tasks__Name-event"></input>
            <textarea placeholder="Description event" id="homepage__tasks__Description-event"></textarea>
            <div className="homepage__tasks__Data-for-event">
                {props.informationDay} {props.informationMounth} {props.informationYear}
            </div>
            <button id='addEventAButton' onClick={() => creatingAnEvent()}>Add</button>
            <div>Name and description event in this day</div>
            <div className="homepage__tasks__Name-event-in-localstorage">{useAppSelector(state => state.CalendarSlice.nameEventForDisplayInTasks)}</div>
            <div className="homepage__tasks__Description-event-in-localstorage">{useAppSelector(state => state.CalendarSlice.descriptionEventForDisplayInTasks)}</div>
        </div>
    );
}