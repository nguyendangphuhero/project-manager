  
import React from "react";
import { List } from "components";

class ListColumn extends React.Component {
  render() {
    const { list, taskMap, index, createNewTask } = this.props;
    let tasks;
    let task_list;
    // console.log("1", list.taskIds, typeof(list.taskIds))
    if (list.taskIds) {
      if(Array.isArray(list.taskIds)){
        task_list = list.taskIds
      }else{
        task_list = Object.values(list.taskIds)
      }
      // console.log(list.taskIds.length)      
      // console.log("sau khi phan loai", task_list)
      tasks = task_list.map((taskId) => taskMap[taskId]);
      tasks = tasks.filter((task)=>task!=undefined || task!=null)
    }
    return (
      <div>
        <List
          list={list}
          tasks={tasks}
          index={index}
          createNewTask={createNewTask}
        />
      </div>
    );
  }
}

export default ListColumn;