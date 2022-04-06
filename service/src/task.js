const admin = require("firebase-admin");
const { firestore } = require("firebase-admin");
const firebaseConfig = require("../firebaseConfig.json");
require("dotenv").config();

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig),
    databaseURL: process.env.DATABASE_URL,
  });
}

const db = admin.database();

const createNewTask = (boardId, task, listId, taskIds) =>
  new Promise((resolve, reject) => {
    try {
      console.log("xoa xong them", taskIds)
      const ref = db.ref(`/boards/${boardId}/tasks/${task.id}`);
      ref.set(task, async (error) => {
        if (error) {
          reject(error);
        } else {
          const response = await linkTaskAndList(boardId, listId, taskIds);
          resolve(response);
        }
      });
    } catch (err) {
      reject(err);
    }
  });

const linkTaskAndList = (boardId, listId, taskIds) =>
  new Promise((resolve, reject) => {
    try {
      const ref = db.ref(`/boards/${boardId}/lists/${listId}/taskIds`);
      ref.set(taskIds, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve(true);
        }
      });
    } catch (err) {
      reject(err);
    }
  });

const updateTaskProperty = (boardId, taskId, property, data) =>
  new Promise((resolve, reject) => {
    const ref = db.ref(`/boards/${boardId}/tasks/${taskId}/${property}`);
    ref.set(data, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve(true);
      }
    });
  });

const switchTasksBetweenLists = (boardId, lists) =>
  new Promise((resolve, reject) => {
    const ref = db.ref(`/boards/${boardId}/lists`);
    ref.set(lists, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve(true);
      }
    });
  });

const reorderTasksInSameList = (boardId, listId, taskIds) =>
  new Promise((resolve, reject) => {
    const ref = db.ref(`/boards/${boardId}/lists/${listId}/taskIds`);
    ref.set(taskIds, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve(true);
      }
    });
  });

const removeTask = (board, boardId, listId, taskId) =>
  new Promise((resolve, reject) => {
    let g = listId
    let a = board.lists[g].taskIds
    console.log("o day", board.lists[g].taskIds)
    let b = a.indexOf(taskId);
    console.log(taskId)
    console.log(b)
    const ref = db.ref(`/boards/${boardId}/tasks/${taskId}`);
    ref.remove((error) => {
      if (error) {
        reject(error);
      }
      else {
        console.log("id",taskId)
        delete taskId;
        resolve(true);

      }
    });
    // if(taskId){
    //   var data = {
    //     taskId: firestore.FieldValue.delete("task-1")
    //   }
    //   ref.set(data, (error) => {
    //     if (error) {
    //       reject(error);
    //     } else {
    //       resolve(true);
    //     }
    //   });
    // }

    // ref = db.ref(`/boards/${boardId}/tasks/${taskId}`);
    // ref.remove((error) => {
    //   if (error) {
    //     reject(error);
    //   } 
    //   else{
    //     resolve(true);}
    // })

  });

module.exports = {
  removeTask,
  createNewTask,
  updateTaskProperty,
  switchTasksBetweenLists,
  reorderTasksInSameList,
};
