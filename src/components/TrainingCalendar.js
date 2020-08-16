
import {Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import React, {useState, useEffect} from 'react'
import 'moment/locale/en-gb'

export default function TrainingCalendar() {

  const localizer = momentLocalizer(moment)
  

  const [events, setEvents] = useState([])
  useEffect(() => fetchData())


  const fetchData = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
    .then(response => response.json())
    .then(data => setEvents(data))
  }

  return ( 
    <div style={{margin: "20px"}}>
      <h1 style={{textAlign: "left"}} >Training Calendar </h1>
      <Calendar
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={events}
        titleAccessor={(event) => event.customer.firstname + " " + event.customer.lastname + " / " + event.activity}
        startAccessor={(event) => new Date(moment(event.date))}
        endAccessor={(event) => new Date(moment(moment(event.date).add(event.duration, 'minutes')))}
        style={{ height: "100vh"}}
      />
    </div>

        
    )
}