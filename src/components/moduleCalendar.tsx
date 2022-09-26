import { useAppSelector } from "../hooks/redux";

const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31 ,30 ,31, 30 ,31];

const Mounth = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6, 
    August: 7,
    September: 8,
    October: 9,
    Novermber: 10,
    December: 11
};

export function isLeapYear(year: number ) {
    return !((year % 4) || (!(year % 100) && (year % 400)));
}

export function getDaysInMounth(date: any) {
    const mounth = date.getMonth();
    const year = date.getFullYear();
    const daysInMounth = DAYS_IN_MONTH[mounth];

    if (isLeapYear(year) && mounth === Mounth.February) {
        return daysInMounth + 1;
    } else {
        return daysInMounth
    }
}


export function getDayOfWeek(date: Date) {
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0) return 6;
    
    return dayOfWeek - 1;
} 

export function getMountData( year: number, mounth: number){
    const result:any = [];
    const date = new Date(year, mounth)
    const daysInMounth = getDaysInMounth(date)
    const mounthStartsOn = getDayOfWeek(date)

    let day = 1;

    for (let i: number = 0; i < (daysInMounth + mounthStartsOn) / 7; i++) {
        result[i] = [];

        for (let j: number = 0; j < 7; j++) {
            if((i === 0 && j < mounthStartsOn) || day > daysInMounth) {
                result[i][j] = undefined;
            } else {
                result[i][j] = new Date(year, mounth, day++);
            }

        }
    }
    return result;
}
