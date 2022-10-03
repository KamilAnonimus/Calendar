import { useMemo, useState } from "react";
import { useAppDispatch} from "../hooks/redux";
import { CalendarSlice } from "../store/reducers/SliderSlises";
import * as moduleCalendar from './moduleCalendar';
import TasksInCalendar from './Tasks'

export default function Calendar() {
    const informationInCalendar = useMemo(() => ({
        date: new Date(),
        monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        weekDayNames: ['Mon', 'Tue', 'Web', 'Thu', 'Fri', 'Sat', 'Sun'],
        year: Number()
    }), [])
    const [date, setDate] = useState ({
        Date: informationInCalendar.date
    })

    interface dateForTasks {
        numberDay: number
    }
    const [dateForTasks, setDateForTasks] = useState<dateForTasks> ({
        numberDay: date.Date.getDate()
    })
    const propsForTasks:any = {
        informationDay: dateForTasks.numberDay,
        informationMounth: informationInCalendar.monthNames[date.Date.getMonth()] === undefined ? 'January' : informationInCalendar.monthNames[date.Date.getMonth()],
        informationYear: date.Date.getFullYear()
    }

    const [idMounts, setIdMounts] = useState(date.Date.getMonth())
    const [eventss, setEvents] = useState('')
    const {increment} = CalendarSlice.actions;
    const {eventName} = CalendarSlice.actions;
    const {eventDescription} = CalendarSlice.actions;
    const dispatch = useAppDispatch()

    const mounthData = moduleCalendar.getMountData(informationInCalendar.year, idMounts)

    const [numberOfEventToUpdateAComponent, setnumberOfEventToUpdateAComponent] = useState(0)

    document.getElementById('addEventAButton')?.addEventListener('click', updatingTheComponentToFireEvents, true)
    function updatingTheComponentToFireEvents() {
        setTimeout(() => {
            setnumberOfEventToUpdateAComponent(numberOfEventToUpdateAComponent + 1)
        }, 1);
    }

    function handlePrevMountButtonClick() {
        const numberDate = new Date(date.Date.getFullYear(), date.Date.getMonth() - 1)
        setIdMounts(date.Date.getMonth() - 1)
        setDate({Date: numberDate})
        dispatch(increment(idMounts))
        document.getElementById(`${dateForTasks.numberDay}`)!.style.backgroundColor = 'rgba(255, 255, 255, 0)'
    };
    function handleNextMountButtonClick() {
        const numberDate = new Date(date.Date.getFullYear(), date.Date.getMonth() + 1)
        setIdMounts(date.Date.getMonth() + 1)
        setDate({Date: numberDate})
        dispatch(increment(idMounts))
        document.getElementById(`${dateForTasks.numberDay}`)!.style.backgroundColor = 'rgba(255, 255, 255, 0)'
    };

    function nowDate(Date:any) {
        if (
            informationInCalendar.date.getDate() === Date.getDate() &&
            informationInCalendar.date.getMonth() === idMounts &&
            informationInCalendar.date.getFullYear() === date.Date.getFullYear()
        ) {
            return true
        }
    }

    function eventDay(date:any) {
        let nameEvent = localStorage.getItem(`NameEvent${date.getDate()}${propsForTasks.informationMounth}${propsForTasks.informationYear}`)

        return nameEvent
    }
    return (
        <div className="container">
            <header>
                <div className="header button-left" onClick={handlePrevMountButtonClick}>{'<'}</div>
                <div className="header mounth">{informationInCalendar.monthNames[date.Date.getMonth()]}</div>
                <div className="header year">{date.Date.getFullYear()}</div>
                <div className="header button-right" onClick={handleNextMountButtonClick}>{'>'}</div>
            </header>
            <div className="homepage">
                <div className="homepage__table">
                    <div className="homepage__table1">
                        <div className="homepage__table2">
                            {informationInCalendar.weekDayNames.map(name =>
                                <div key={name} className='homepage__table2__name-days'>{name}</div>
                            )}
                        </div>
                    </div>
                    <div className="homepage__table__weeks">
                        {mounthData.map((week: any, index: any) => 
                            <div key={index} className={`homepage__table__weeks2__week ${index}`}>
                                {week.map((date: any, index: number) => date ?
                                    <div
                                        key={index} 
                                        className={`${nowDate(date) ? 'homepage__table__week__dayNow' : 'homepage__table__weeks2__week__day'}`}
                                        id={date.getDate()}
                                        onClick={(el) => {
                                            setDateForTasks({
                                                numberDay: Number(el.currentTarget.id)
                                            })
                                            if (Number(el.currentTarget.id) !== informationInCalendar.date.getDate()) {
                                                if(informationInCalendar.date.getDate() !== dateForTasks.numberDay) {
                                                    document.getElementById(`${dateForTasks.numberDay}`)!.style.backgroundColor = 'rgba(255, 255, 255, 0)'
                                                }
                                                document.getElementById(`${el.currentTarget.id}`)!.style.backgroundColor = 'rgb(29, 58, 187)';
                                            } else {
                                                if(informationInCalendar.date.getDate() !== dateForTasks.numberDay) {
                                                    document.getElementById(`${dateForTasks.numberDay}`)!.style.backgroundColor = 'rgba(255, 255, 255, 0)'
                                                }
                                            }
                                            let descriptionEvent = localStorage.getItem(`DescriptionEvent${date.getDate()}${propsForTasks.informationMounth}${propsForTasks.informationYear}`)
                                            let nameEvent = localStorage.getItem(`NameEvent${date.getDate()}${propsForTasks.informationMounth}${propsForTasks.informationYear}`)
                                            if(descriptionEvent !== null && nameEvent !== null) {
                                                dispatch(eventName(nameEvent))
                                                dispatch(eventDescription(descriptionEvent))
                                            } else {
                                                let descriptionEvent = ''
                                                let nameEvent = ''
                                                dispatch(eventName(nameEvent))
                                                dispatch(eventDescription(descriptionEvent))
                                            }
                                        }}
                                    >{date.getDate()}
                                    <div id={`homepage__table__week__eventName${date.getDate()}`}>{`${eventDay(date) === null ? '' : eventDay(date)}`}</div>
                                    </div>
                                    :
                                    <div key={index} className='day-and-no-date'></div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <TasksInCalendar {...propsForTasks}/>
            </div>
        </div>
    );
}