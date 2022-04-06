export const CreateNewTask = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(process.env.REACT_APP_SERVICE_URL + `/task`, {
        method: "POST",
        headers: new Headers({
          "Content-type": "application/json; charset=UTF-8",
        }),
        body: JSON.stringify(body),
      });
      resolve(await response.json());
    } catch (err) {
      reject(err);
    }
  });

export const ReorderTasks = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(
        process.env.REACT_APP_SERVICE_URL + `/task-reorder`,
        {
          method: "PUT",
          headers: new Headers({
            "Content-type": "application/json; charset=UTF-8",
          }),
          body: JSON.stringify(body),
        }
      );
      resolve(await response.json());
    } catch (err) {
      reject(err);
    }
  });

export const SwitchTasks = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(
        process.env.REACT_APP_SERVICE_URL + `/task-switch`,
        {
          method: "PUT",
          headers: new Headers({
            "Content-type": "application/json; charset=UTF-8",
          }),
          body: JSON.stringify(body),
        }
      );
      resolve(await response.json());
    } catch (err) {
      reject(err);
    }
  });

  // Lay du lieu de truyen vao database
  //input

export const UpdateTaskProperty = (body) =>
  new Promise(async (resolve, reject) => {
    // console.log("chu cai",JSON.stringify(body))
    try {
      let response = await fetch(
        process.env.REACT_APP_SERVICE_URL + `/task-update`,
        {
          method: "PUT",
          headers: new Headers({
            "Content-type": "application/json; charset=UTF-8",
          }),
          body: JSON.stringify(body),
        }
      );
      resolve(await response.json());
    } catch (err) {
      reject(err);
    }
  });
  export const DeleteTask = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(
        process.env.REACT_APP_SERVICE_URL + `/task/remove`,
        {
          method: "PUT",
          headers: new Headers({
            "Content-type": "application/json; charset=UTF-8",
          }),
          body: JSON.stringify(body),
        }
      );
      resolve(await response.json());
    } catch (err) {
      reject(err);
    }
  });