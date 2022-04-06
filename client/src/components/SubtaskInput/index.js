import React, { useState, useContext, useEffect, inputRef } from "react";
import {
  Grid,
  Button,
  Avatar,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { GetUniqueId } from "api/Common";
import { UserContext } from "provider/UserProvider";
import { UserAvatar } from "components";
import { inputStyles, CommentInput } from "./styles";
import "components/ToDoList/styles.css";
// dien comment vao. roi submit
const EditDescription = ({ handleButtonClick }, props) => {
  const classes = inputStyles();
 
  const { userData } = useContext(UserContext);
  const [status, setStatus] = useState("");
  const [comment, setComment] = useState("");
  const [time, setTime] = useState();
  const [commentError, setCommentError] = useState();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { value } = e.target;
    setComment(value);
  };

  const handleCommentButton = async () => {
    setLoading(true);
    setCommentError();
    if (comment.trim() <= 0) {
      setCommentError("You can't submit empty comment!");
      setLoading(false);
    } else {
      const id = await GetUniqueId();
      const response = await handleButtonClick({
        id: id.data,
        uid: userData.uid,
        name: userData.name,
        picture: userData.picture,
        status: false,
        text: comment,
        time: time || "24 August at 20:43",
      });
      if (response) {
        setLoading(false);
      } else {
        setLoading(false);
        setCommentError(`Couldn't submit the comment!`);
      }
      setComment(" ");
      setStatus(" ");
    }
  };

  useEffect(() => {
    const now = new Date();
    const day = now.getDate();
    const month = now.toLocaleString("en-EN", { month: "long" });
    const time = now.toLocaleString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    setTime(day + " " + month + " at " + time);
  }, [comment]);

  useEffect(() => {
    setTimeout(() => {
      setCommentError();
    }, 5000);
  }, [commentError]);

  return (
    <>
      <h1>SubTasks</h1>
      <Grid container className='todo-form' >
        {/* <Grid item sm={1} xs={2}>
          <UserAvatar user={userData} styles={classes.avatar} />
        </Grid> */}
        <>
        <Grid >
          <input
          style={{ marginLeft: "4px"}}
          className='todo-input'
            value={comment}
            onChange={handleChange}           
            multiline
            rowsMax={4}
            rows={1}
          />
           <button
           
              className='todo-button'
              variant="contained"
              color="primary"
              onClick={handleCommentButton}
              disabled={loading}
            >
              Add To do
            </button>
            {loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
        </Grid>
        </>
        <>
        {/* <Grid item container xs={12} justify="flex-end">
          <Grid item sm={3} xs={4}>
           
          </Grid>
        </Grid> */}
        </>
      </Grid>
      <Grid
        style={{ marginTop: "8px", display: commentError ? "block" : "none" }}
        item
        container
        xs={12}
      >
        <Typography className={classes.commentError}>{commentError}</Typography>
      </Grid>
    </>
  );
};

export default EditDescription;
