import React from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'; // if using DnD

const localizer = momentLocalizer(moment)
moment.locale('pt-br');

export default function Agenda() {
    const eventos = [
        {
            id: 0,
            title: 'Leandro',
            allDay: true,
            start: moment().startOf('week').day(1)._d,
            end: moment().endOf('week').day(8)._d,
        },
        {
            id: 1,
            title: 'Felipe',
            allDay: true,
            start: moment().startOf('month').startOf('week').day(1)._d,
            end: moment().startOf('month').startOf('week').day(9)._d,
        },
        {
            id: 2,
            title: 'Leonan',
            allDay: true,
            start: moment().startOf('month').day(7).startOf('week').day(1)._d,
            end: moment().startOf('month').day(7).startOf('week').day(9)._d,
        },
        {
            id: 3,
            title: 'Leandro',
            allDay: true,
            start: moment().startOf('month').day(14).startOf('week').day(1)._d,
            end: moment().startOf('month').day(14).startOf('week').day(9)._d,
        },
        {
            id: 4,
            title: 'Vitor',
            allDay: true,
            start: moment().startOf('month').day(21).startOf('week').day(1)._d,
            end: moment().startOf('month').day(21).startOf('week').day(9)._d,
        },
        {
            id: 5,
            title: 'Felipe',
            allDay: true,
            start: moment().startOf('month').day(35).startOf('week').day(1)._d,
            end: moment().startOf('month').day(35).startOf('week').day(9)._d,
        },
        {
            id: 6,
            title: 'Leonan',
            allDay: true,
            start: moment().startOf('month').day(42).startOf('week').day(1)._d,
            end: moment().startOf('month').day(42).startOf('week').day(9)._d,
        },
        {
            id: 7,
            title: 'Vitor',
            allDay: true,
            start: moment().startOf('month').day(49).startOf('week').day(1)._d,
            end: moment().startOf('month').day(49).startOf('week').day(9)._d,
        },
    ];

    return (        
        <div>
            <Calendar
                localizer={localizer}
                events={eventos}
                startAccessor="start"
                endAccessor="end"
                culture="pt-br"
                style={{ height: 500 }}
            />
        </div>
    );
}

