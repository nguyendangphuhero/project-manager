import React, { useContext, useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@material-ui/core";
import { UserContext } from "provider/UserProvider";
import { EditInput, EditSubtask, UserAvatar } from "components";
import { commentStyles } from "./styles";
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import { CompareArrowsOutlined } from "@material-ui/icons";
import "components/ToDoList/styles.css";

const ListTodo = ({ subtask, comment, deleteSubtask, editSubtask }) => {

  const [todos, setTodos] = useState(subtask);

  const completeTodo = id => {
    let updatedTodos = todos.map(todo => {

      if (comment.id === id) {
        comment.status = "true";
      }
      console.log("todo", todo)
      return todo;

    });
    console.log("status", comment.status)

    setTodos(updatedTodos);
  };

  const classes = commentStyles();

  const { userData } = useContext(UserContext);
  const [owner, setOwner] = useState(false);

  const [displayEditArea, setDisplayEditArea] = useState(false);
  const [displayDeleteDialog, setDisplayDeleteDialog] = useState(false);

  const handleEditButtonClick = () => {
    setDisplayEditArea(!displayEditArea);
  };

  const closeEditArea = () => {
    setDisplayEditArea(false);
  };

  const handleEditSubtask = (input) => {
    editSubtask(comment.id, input);
  };

  const handleDeleteButtonClick = () => {
    setDisplayDeleteDialog(!displayDeleteDialog);
  };

  const closeDeleteDialog = () => {
    setDisplayDeleteDialog(false);
  };

  const handleDeleteSubtask = () => {
    deleteSubtask(comment.id);
    closeDeleteDialog();
  };

  useEffect(() => {
    if (userData.uid === comment.uid) {
      setOwner(true);
    }
  }, [userData]);

  return (
    <Grid container >
      <Grid item container xs={12} >
        {/* <Grid item xs={1}>
          
          <UserAvatar user={comment} styles={classes.avatar} />
        </Grid> */}
        <Grid item container xs={7} style={{ paddingLeft: "0px" }}>
          {/* <Grid item xs={12}>
            <Typography className={classes.userName}>{comment.name}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.date}>{comment.time}</Typography>
          </Grid> */}

        </Grid>

        <Grid item container xs={12}>
          {owner && (
            <>
              
              {/* <Grid item xs={3}>
                <Typography
                  onClick={handleEditButtonClick}
                  className={classes.commentButton}
                >
                  Edit
                </Typography>
              </Grid> */}
              {/* <Grid
                item
                xs={1}
                style={{
                  marginLeft: "5px",
                  marginRight: "10px",
                  marginTop: "-2.5px",
                }}
              >
                -
              </Grid> */}
              <Grid item container xs={12} style={{ marginTop: "0px" }}>
                {displayEditArea ? (
                  <EditSubtask
                    handleClose={closeEditArea}
                    editInput={handleEditSubtask}
                    value={comment.text}
                    label="Subtask"
                  />
                ) : (
                  <div
                className={comment.status == "true" ? 'todo-row complete' : 'todo-row'}
              >
                <div key={comment.id} onClick={() => completeTodo(comment.id)}   >
                  {comment.text}
                </div>
                <div className='icons'>
                  <RiCloseCircleLine
                    onClick={handleDeleteButtonClick}

                    className='delete-icon'
                  />
                  <TiEdit
                    onClick={handleEditButtonClick}
                    className='edit-icon'
                  />
                </div>
              </div>
                )}
              </Grid>
              {/* <Grid item xs={3}>
                <Typography
                  onClick={handleDeleteButtonClick}
                  className={classes.commentButton}
                >
                  Delete
                </Typography>
              </Grid> */}
              <Dialog
                open={displayDeleteDialog}
                onClose={closeDeleteDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle>{"Delete this subtask?"}</DialogTitle>
                <DialogActions>
                  <Button onClick={closeDeleteDialog} color="primary">
                    Go Back
                  </Button>
                  <Button
                    onClick={handleDeleteSubtask}
                    style={{ color: "#f44336" }}
                    autoFocus
                  >
                    Delete
                  </Button>
                </DialogActions>
              </Dialog>
            </>
          )}
        </Grid>
      </Grid>

    </Grid>
  );
};

export default ListTodo;
