import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { CalendarSlice } from "../store/reducers/SliderSlises";
import * as moduleCalendar from './moduleCalendar';

export default function Calendar() {
    const informationInCalendar = {
        date: new Date(),
        monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        weekDayNames: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс',],
        year: Number(),
    }
    const reduxContainerMount = useAppSelector(state => state.CalendarSlice.idMount)
    const [date, setDate] = useState ({
        date: informationInCalendar.date
    })

    const [idMounts, setIdMounts] = useState(date.date.getMonth())
    const {increment} = CalendarSlice.actions;
    const dispatch = useAppDispatch()

    const mounthData = moduleCalendar.getMountData(informationInCalendar.year, reduxContainerMount)

    function handlePrevMountButtonClick() {
        const numberDate = new Date(date.date.getFullYear(), date.date.getMonth() - 1)
        setIdMounts(date.date.getMonth() + 1)
        setDate({date: numberDate})
        dispatch(increment(idMounts))
    };
    function handleNextMountButtonClick() {
        const numberDate = new Date(date.date.getFullYear(), date.date.getMonth() + 1)
        setIdMounts(date.date.getMonth() + 1)
        setDate({date: numberDate})
        dispatch(increment(idMounts))
    };
    return (
        <div className="container">
            <header>
                <div className="container__header button-left" onClick={handlePrevMountButtonClick}>{'<'}</div>
                <div className="container__header mounth">{informationInCalendar.monthNames[reduxContainerMount] === undefined ? 'Январь' : informationInCalendar.monthNames[reduxContainerMount]}</div>
                <div className="container__header year">{date.date.getFullYear()}</div>
                <div className="container__header button-right" onClick={handleNextMountButtonClick}>{'>'}</div>
            </header>
            <div className="container__table">
                <div className="container__table1">
                    <div className="container__table2">
                        {informationInCalendar.weekDayNames.map(name =>
                            <div key={name} className='container__table2__name-days'>{name}</div>
                        )}
                    </div>
                </div>
                <div className="container__table__weeks">
                    {mounthData.map((week: any, index: any) => 
                        <div key={index} className={`container__table__weeks2__week ${index}`}>
                            {week.map((date: any, index: any) => date ?
                                <div
                                    key={index} 
                                    className="day"
                                >{date.getDate()}
                                </div>
                                :
                                <div key={index} className='day-and-no-date'></div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}