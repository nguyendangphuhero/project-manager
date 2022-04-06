import { UpdateTaskProperty, DeleteTask } from "api/Task";

// Xu li data
const HandleTaskPropertyUpdate = (board, taskId, property, data) =>
  new Promise((resolve, reject) => {
    if (board && taskId && property && data) {
      board.tasks[taskId][property] = data;
      UpdateTaskProperty({
        boardId: board.id,
        taskId: taskId,
        property: property,
        data: data || " ",
      })
        .then(() => resolve(board))
        .catch((err) => reject(err));
    } else {
      reject("Missing parameters");
    }
  });

  const HandleDeletingTask = (board, listId, taskId) =>
  new Promise((resolve, reject) => {
    if (board && listId && taskId) {
      DeleteTask({
        boardId: board.id, 
        listId: listId,
        taskId: taskId,
        board: board,
      })
        .then(() => resolve(true))
        .catch((err) => reject(err));
    } else {
      reject("Missing parameters");
    }
  }); 


const TaskHelpers = {
  HandleTaskPropertyUpdate: HandleTaskPropertyUpdate,
  HandleDeletingTask: HandleDeletingTask,
};

export default TaskHelpers;
