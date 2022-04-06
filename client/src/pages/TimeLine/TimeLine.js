import './Timeline.css'
import { UserContext } from "provider/UserProvider";
import { UIContext } from "provider/UIProvider";
import React, { useState, useContext, useEffect } from "react";
const timelineData = [
    {
      "assigments": [
        "gpdkSbMayCVe12Ma3imruRrevjH3"
      ],
      "id": "task-680a85d4-dd4c-426c-8c3a-4026985f155a",
      "start": "2022-03-17T18:05:33.000Z",
      "status": 1,
      "title": "a",
      "text": "a",
      "date": "2022-03-17T18:05:33.000Z"
    },
    {
      "assigments": [
        "gpdkSbMayCVe12Ma3imruRrevjH3",
        "uBAnYHlAwmMN7s0lkSEWxWkZIPr1"
      ],
      "id": "task-7ba00bf7-4d23-49c2-8b44-e3d3eb1e7cf5",
      "status": 1,
      "title": "4",
      "text": "4"
    },
    {
      "assigments": [
        "gpdkSbMayCVe12Ma3imruRrevjH3"
      ],
      "id": "task-b97d0dd8-5c2b-4c56-917b-4a71d47e7638",
      "start": "2022-03-18T18:05:44.000Z",
      "status": 2,
      "title": "b",
      "text": "b",
      "date": "2022-03-18T18:05:44.000Z"
    }
  ]

  console.log(timelineData)

  const TimelineItem = ({ data }) => (
    <div className="timeline-item">
        <div className="timeline-item-content">

            <div>{data.date}</div>
            <p className="mauchu">{data.text}</p>

            <span className="circle" />
        </div>
    </div>
);

export const Timeline = () => {
    const [dataset, setDataset] = useState(null)
  const { userData } = useContext(UserContext);
  const [mang, setMang] = useState([]);
  // console.log(userData.uid)

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
  const convert_date_to_string = (date)=>{
    if(!date||date=="")
    {
      return "";
    }
    
    var date= new Date(date);
    var time= date.getHours();
    var minutes= date.getMinutes();
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0');
    var yyyy = date.getFullYear();
    
    return time +":" + minutes +" "+ mm + '/' + dd + '/' + yyyy;
    }

  // const mang = []

  useEffect(() => {
    if (dataset == null) {
      console.log("null roi chu")
    } else {
      if(dataset.tasks) {
      let newMang = [...mang];
      Object.keys(dataset.tasks).forEach(it => {
        if(dataset.tasks[it].assigments){
          if(dataset.tasks[it].assigments.includes(userData.uid)){
          if(dataset.tasks[it].status!=3){
          dataset.tasks[it].text= dataset.tasks[it].title;
          dataset.tasks[it].date = dataset.tasks[it].deadline;  
          newMang.push(dataset.tasks[it]);
          }
        }}
      });
      newMang.sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        console.log(typeof(a.deadline))
        if(typeof(a.deadline) === "object"){
          return a.deadline - b.deadline
        } else{
        return new Date(a.deadline) - new Date(b.deadline);
        }
      });
      Object.keys(newMang).forEach(it => {newMang[it].date=convert_date_to_string(newMang[it].deadline)})
      setMang(newMang);
    }
    

      
    }
  }, [dataset]);

  
  console.log(mang)
    return(
        
        <div className="body-line-time">
        <div style={{ width: "2000px"}}>
        <h1>TimeLine</h1>
        <div className="timeline-container">
            {mang.map((data, idx) => (
                <TimelineItem data={data} key={idx} />
            ))}
        </div>
        </div>
        </div>
    );}
export default Timeline;