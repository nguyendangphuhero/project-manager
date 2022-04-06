import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./styles.css";
import { useEffect, useContext } from 'react';
// import { UserContext } from "provider/UserProvider";
import { UIContext } from "provider/UIProvider";

const locales = {
    "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

// const events = [
//     {
//         title: "Big Meeting",
//         allDay: true,
//         start: new Date(2021, 6, 0),
//         end: new Date(2021, 6, 0),
//     },
//     {
//         title: "Vacation",
//         start: new Date(2021, 6, 7),
//         end: new Date(2021, 6, 10),
//     },
//     {
//         title: "Conference",
//         start: new Date(2021, 6, 20),
//         deadline: new Date(2021, 6, 23),
//     },
//     {
//         "assigments": [
//           "gpdkSbMayCVe12Ma3imruRrevjH3",
//           "kp7zZED3IYNnauDoTqDESF8fiQm2"
//         ],
//         "deadline": "2022-02-10T19:18:11.000Z",
//         "id": "task-1",
//         "start": "2022-02-10T19:15:00.000Z",
//         "status": 1,
//         "title": "hello"
//       },
// ];






const App = () => {
    const [dataset, setDataset] = useState(null)

    const {
        renderedBoard,
        setShowFooter,
        setRenderedBoard,
        setShowAllBoards,
        setOpenBackdrop,
    } = useContext(UIContext);

    useEffect(() => {
        setDataset(renderedBoard)

    }, []);

    const mang = []

    if(dataset==null){
        console.log("null roi chu")
      }else{
            Object.keys(dataset.tasks).forEach(it => {
            dataset.tasks[it].start = new Date(dataset.tasks[it].start);
            dataset.tasks[it].deadline = new Date(dataset.tasks[it].deadline);
            mang.push(dataset.tasks[it]) })
            console.log(mang)
      }


    const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
    const [allEvents, setAllEvents] = useState(mang);
    

    function handleAddEvent() {
        setAllEvents([...allEvents, newEvent]);
    }

    return (
        <div >
            {/* <h1>Calendar</h1>
            <h2>Add New Event</h2>
            <div>
                <input type="text" placeholder="Add Title" style={{ width: "20%", marginRight: "10px" }} value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
                <DatePicker placeholderText="Start Date" style={{ marginRight: "10px" }} selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} />
                <DatePicker placeholderText="End Date" selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })} />
                <button stlye={{ marginTop: "10px" }} onClick={handleAddEvent}>
                    Add Event
                </button>
            </div> */}
            <Calendar localizer={localizer} events={mang} startAccessor="start" endAccessor="deadline" style={{ height: 500, margin: "50px" }} />
        </div>
    );
}

export default App;
