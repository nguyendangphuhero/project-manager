import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import { Dashboard, Apps } from "@material-ui/icons";
import Menu from "./Menu";
import { headerStyles } from "./styles";
import { UIContext } from "provider/UIProvider";
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
// import Notification from "components/Notifitions/index"
// import { Component } from "react";
import tomato from "./tomato.png"
import dashboardImg from "./piechart.png"
import filter from "./index.png"
import CalendarView from "./CalendarView.png"
import GanttView from "./GanttView.png"
import ReactTooltip from "react-tooltip";
import MyTask from "./MyTask.png";
import SectionView from "./SectionView.png";
import { UserContext } from "provider/UserProvider";
import NotifyMe from "react-notification-timeline";
import Notifications from 'components/Notifitions';
import timeline from "./time-line.png"

const Header = () => {
  const [dataset, setDataset] = useState(null)
  const { userData } = useContext(UserContext);

  let history = useHistory();
  const classes = headerStyles();
  const { showAllBoards, renderedBoard } = useContext(UIContext);

  console.log(renderedBoard)

  const handleBoardClick = (boardId) => {
    history.push("/boardFilter/" + boardId);
    window.location.reload(false)
  };

  const handleBoardClick1 = (boardId) => {
    history.push("/board/" + boardId);
    window.location.reload(false)
  };

  const handleBoardClick2 = (boardId) => {   
    history.push("/boardNotDone/" + boardId);
    window.location.reload(false)
  };


  // useEffect(() => {
  //   setDataset(renderedBoard)

  // }, []);

  // const mang = []

  // if (renderedBoard == null) {
  //   console.log("null roi chu")
  // } else {
  //   Object.keys(renderedBoard.tasks).forEach(it => {
  //     if (renderedBoard.tasks[it].assigments) {
  //       if (renderedBoard.tasks[it].assigments.includes(userData.uid)) {
  //         if (renderedBoard.tasks[it].status != 3) {
  //           renderedBoard.tasks[it].update = renderedBoard.tasks[it].title;
  //           renderedBoard.tasks[it].timestamp = renderedBoard.tasks[it].start
  //           mang.push(renderedBoard.tasks[it])
  //         }
  //       }
  //     }
  //   })
  //   console.log(mang)

  // }
  console.log("hello")
  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} position="static">
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            aria-label="menu"
            onClick={() => history.push("/boards")}
          >
            <Dashboard className={classes.menuIcon} />
            <Typography variant="h6" className={classes.menuTitle}>
              Project Management
            </Typography>
            
          </IconButton>
          
          
          {showAllBoards === true ? (
            <div className={classes.boardsContainer}>
              <Typography className={classes.title}>
                {renderedBoard.title}
              </Typography>
              <IconButton
                onClick={() => history.push("/boards")}
                className={classes.allBoardsButton}
              >
                <Apps className={classes.allBoardsIcon} />
                <Typography className={classes.allBoardsText}>
                  All Projects
                </Typography>
              </IconButton>
              <div style={{ marginLeft: "16px" }} >


                <button data-tip data-for="board" style={{ marginRight: "6px" }} onClick={() => handleBoardClick1(renderedBoard.id)}><img src={SectionView} width="26" height="26"></img></button>
                <button data-tip data-for="registerTip" style={{ marginRight: "6px" }}><NavLink to="/pomodoro" ><img src={tomato} width="26"  ></img></NavLink></button>
                <button data-tip data-for="dashboard" style={{ marginRight: "6px" }}><NavLink to="/dashboard"><img src={dashboardImg} width="26" ></img></NavLink></button>
                <button data-tip data-for="calendarView" style={{ marginRight: "6px" }}><NavLink to="/CalendarView"><img src={CalendarView} width="26"></img></NavLink></button>
                <button data-tip data-for="ganttView" style={{ marginRight: "6px" }}><NavLink to="/gant"><img src={GanttView} width="26"></img></NavLink></button>
                <button data-tip data-for="timeline" style={{ marginRight: "6px" }}><NavLink to="/TimeLine"><img src={timeline} width="26"></img></NavLink></button>

                {/* <Notification></Notification> */}
                <button data-tip data-for="userview" style={{ marginRight: "6px" }} onClick={() => handleBoardClick(renderedBoard.id)}><img src={filter} width="26" ></img></button>
                <button data-tip data-for="mytasknotdone" style={{ marginRight: "6px" }} onClick={() => handleBoardClick2(renderedBoard.id)}><img src={MyTask} width="26" ></img></button>
                
                {/* <button data-tip data-for="thongbao" style={{ marginRight: "6px" }}><NavLink to="/Notifitions"><img src={filter} width="26" height="26" ></img></NavLink></button> */}
                
                <ReactTooltip id="registerTip" place="top" effect="solid">
                  Pomodoro
                </ReactTooltip>
                <ReactTooltip id="dashboard" place="top" effect="solid">
                  Dashboard
                </ReactTooltip>
                <ReactTooltip id="calendarView" place="top" effect="solid">
                  Calendar View
                </ReactTooltip>
                <ReactTooltip id="ganttView" place="top" effect="solid">
                  Gantt View
                </ReactTooltip>
                <ReactTooltip id="mytasknotdone" place="top" effect="solid">
                  My task not done
                </ReactTooltip>
                <ReactTooltip id="userview" place="top" effect="solid">
                  User View
                </ReactTooltip>
                <ReactTooltip id="board" place="top" effect="solid">
                  Board
                </ReactTooltip>
                <ReactTooltip id="thongbao" place="top" effect="solid">
                Notifitions
                </ReactTooltip>
                <ReactTooltip id="timeline" place="top" effect="solid">
                Timeline
                </ReactTooltip>
                

              </div>
              {/* <Notifications></Notifications> */}

            </div>
          ) : (
            <div className={classes.boardsContainer}>
            </div>
            
          )}
          <Menu history={history} />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
