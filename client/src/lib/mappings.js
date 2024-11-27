'use strict';

import dayjs from "dayjs";

const getWeekday = () => {
    const weekMap = {
        'sunday' : '0',
        'monday' : '1',
        'tuesday' : '2',
        'wednesday' : '3',
        'thursday' : '4',
        'friday' : '5',
        'saturday' : '6',
    }
    const weekday = dayjs().day().toString(); 
    return weekday;
};

