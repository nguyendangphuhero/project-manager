import React, { Component } from "react";
import ReactDOM from "react-dom";

import TimeLine from "react-gantt-timeline";
import "./styles.css";
import { useState, useEffect, useContext } from 'react';
import { UserContext } from "provider/UserProvider";
import { UIContext } from "provider/UIProvider";

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
            dataset.tasks[it].name= dataset.tasks[it].title;
            dataset.tasks[it].end = dataset.tasks[it].deadline;
            mang.push(dataset.tasks[it]) })     
            console.log(mang)
      }

    return (
      <div className="app-container ">
        <h1>Gantt View</h1>
        {/* DayWidth<input type="range" min="30" max="500" value={this.state.daysWidth} onChange={this.handleDayWidth} step="1"/>
       Item Height<input type="range" min="30" max="500" value={this.state.itemheight} onChange={this.handleItemHeight} step="1"/> */}
        <div className="time-line-container">
          <TimeLine data={mang}  />
        </div>
      </div>
    );
  }

export default App;
