import React, { useState, useContext, useEffect } from "react";
import "./styles.css";
// import NotifyMe from "./NotifyMe";
import NotifyMe from "react-notification-timeline";
import { UserContext } from "provider/UserProvider";
import { UIContext } from "provider/UIProvider";

export default function App() {
  const [dataset, setDataset] = useState(null)
  const { userData } = useContext(UserContext);
  console.log(userData.uid)

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

  if (dataset == null) {
    console.log("null roi chu")
  } else {
    if(dataset.tasks){
    Object.keys(dataset.tasks).forEach(it => {
      if(dataset.tasks[it].assigments){
        if(dataset.tasks[it].assigments.includes(userData.uid)){
        if(dataset.tasks[it].status!=3){
        dataset.tasks[it].update= dataset.tasks[it].title;
        dataset.tasks[it].timestamp = dataset.tasks[it].start
        mang.push(dataset.tasks[it])
        }
      }}
    })}
  //   if(mang){
  //   mang.sort(function (a, b) {
  //     return a.timestamp.localeCompare(b.timestamp);
  // });}
  }
 
console.log(mang)
console.log(mang)
  return (
    <div style={{ marginLeft: "900px" }} className="Notifitions">
      {/* <button onclick="history.back()">Go Back</button> */}
      <NotifyMe tyle={{ background: 'yellow' }}
        data={mang}
        storageKey="notific_key"
        notific_key="timestamp"
        notific_value="update"
        heading="All task need to done"
        sortedByKey={true}
        showDate={true}
        size={40}
        color="yellow"
      />
    </div>
  );
}
