import React, { useEffect, useState, useContext } from "react";
import {
  Grid,
  Typography,
  Modal,
  IconButton,
  LinearProgress,
  Avatar,
} from "@material-ui/core";
import { Clear, Add, Edit } from "@material-ui/icons";
import {
  SectionTitle,
  LightButton,
  GrayButton,
  Attachment,
  CoverMenu,
  LabelsMenu,
  Label,
  Comment,
  EditInput,
  CommentInput,
  SubtaskInput,
  AssignMemberMenu,
  UserAvatar,
  ListTodo,
} from "components";
import { UserContext } from "provider/UserProvider";
import { modalStyles } from "./styles";
import DatePickerInput from "components/DataPickerInput";
import HorizontalNonLinearStepper from "components/HorizontalNonLinearStepper";
import TodoList from "components/ToDoList/ToDoList";
import "components/ToDoList/styles.css";
import TimeStart from "components/TimeStart";
import { TaskHelpers } from "helpers";
import { useHistory } from "react-router-dom";


const imageFormats = [
  "APNG",
  "AVIF",
  "GIF",
  "PNG",
  "SVG",
  "WEBP",
  "JPEG",
  "JPG",
  "JFIF",
  "PJPEG",
  "PJP",
];

const EditTaskModal = ({
  open,
  handleClose,
  coverImage,
  taskTitle,
  listTitle,
  editDescription,
  editTitle,
  editDatePicker,
  editStart,
  editStatus,
  description,
  start,
  deadline,
  statusTask,
  subtask,
  deleteSubtask,
  submitsubtask, 
  labels,
  assigments,
  comments,
  submitComment,
  deleteComment,
  editSubtask,
  editComment,
  attachments,
  addAttachment,
  deleteAttachment,
  addImageToTask,
  addLabel,
  deleteLabel,
  assignMemberToTask,
  removeAssignedMember,
  taskId,
  listId
}) => {
  // console.log("hello",statusTask)

  let history = useHistory();

  const classes = modalStyles();
  const { renderedBoard,setRenderedBoard } = useContext(UserContext);
  const [displayEditDatePicker, setDisplayEditDatepicker] = useState(false);

  const [displayEditStart, setDisplayEditStart] = useState(false);
  const [displayEditArea, setDisplayEditArea] = useState(false);
  const [displayEditTitle, setDisplayEditTitle] = useState(false);
  const [displayProgress, setDisplayProgress] = useState(false);

  const [uploadError, setUploadError] = useState();

  const [coverAnchorEl, setCoverAnchorEl] = useState(null);
  const [labelAnchorEl, setLabelAnchorEl] = useState(null);
  const [memberAnchorEl, setMemberAnchorEl] = useState(null);

  const [assignedUsers, setAssignedUsers] = useState([]);

  const [datePicker, setDatePicker] = useState(null);

  const [dayStart, setStart] = useState(null);

  const [status, setStatus] = useState(statusTask);

  const handleDatePickerChange = (newValue) => {
    setDatePicker(convert_date_to_string(newValue));
  };

  const handleStartChange = (newValue) => {
    setStart(convert_date_to_string(newValue));
  };


  const handleStatusChange = (newValue) => {
    setStatus(newValue);
  };

  const handleEditTitleButtonClick = () => {
    setDisplayEditTitle(!displayEditTitle);
  };

  const closeEditTitle = () => {
    setDisplayEditTitle(false);
  };

  const handleEditDatePickerClick = () => {
    setDisplayEditDatepicker(!displayEditDatePicker);
  };

  const handleEditStartClick = () => {
    setDisplayEditStart(!displayEditStart);
  };
  

  const handleEditButtonClick = () => {
    setDisplayEditArea(!displayEditArea);
  };
  
  const handleCloseDatePicker = () => {
    setDisplayEditDatepicker(false);
  };

  const handleCloseStart = () => {
    setDisplayEditStart(false);
  };



  const closeEditArea = () => {
    setDisplayEditArea(false);
  };

  const handleCoverButtonClick = (event) => {
    setCoverAnchorEl(event.currentTarget);
  };

  const handleCoverMenuClose = () => {
    setCoverAnchorEl(null);
  };

  const handleLabelButtonClick = (event) => {
    setLabelAnchorEl(event.currentTarget);
  };

  const handleLabelMenuClose = () => {
    setLabelAnchorEl(null);
  };

  const handleMemberButtonClick = (event) => {
    setMemberAnchorEl(event.currentTarget);
  };

  const handleMemberMenuClose = () => {
    setMemberAnchorEl(null);
  };

  const handleBoardClick = (boardId) => {
    history.push("/board/" + boardId);
    window.location.reload(false)
  };

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

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    setUploadError();
    if (file) {
      if (file.size > 5000000) {
        setUploadError("Upload limit is 5mb! ");
      } else {
        setDisplayProgress(true);
        const now = new Date();
        const day = now.getDate();
        const month = now.toLocaleString("en-EN", { month: "long" });
        const year = now.getFullYear();
        file.uploadDate = `${month} ${day}, ${year}`;
        file.fileType = file.type
          .slice(file.type.lastIndexOf("/") + 1, file.type.length)
          .toUpperCase();
        const response = await addAttachment(file);
        if (response) {
          setDisplayProgress(false);
        } else {
          setDisplayProgress(false);
          setUploadError("Upload failed try uploading it later!");
        }
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setUploadError();
    }, 5000);
  }, [uploadError]);

  useEffect(() => {
    if (renderedBoard) {
      const users = renderedBoard.userData.filter((user) =>
        assigments.includes(user.uid)
      );
      setAssignedUsers(users);
    }
  }, [assigments]);

  const handleDeleteTaskButtonClick = () => {
    
    if (renderedBoard && renderedBoard.lists && renderedBoard.tasks) {
      let newState = { ...renderedBoard };
      
      // console.log("xem taskId co bi trung",taskId)

      // console.log("trc xoa, new State.tasks",newState.tasks[taskId])
      // task-3a243cdc-1db8-422c-966a-79bf7116b725: {id: 'task-3a243cdc-1db8-422c-966a-79bf7116b725', title: '3'}
      // task-41b95e4c-d4aa-4c5e-b8da-00611bca6dbc: {id: 'task-41b95e4c-d4aa-4c5e-b8da-00611bca6dbc', title: '4'}
      // task-709d143f-891d-44eb-9c66-205adcc330f6: {id: 'task-709d143f-891d-44eb-9c66-205adcc330f6', title: 'a'}

      console.log(newState)
      console.log("xoa cai ni",newState.tasks[taskId])
      // {id: 'task-28fb799d-44a3-4039-93e4-dbcf191a26ba', title: '1'}

      delete newState.tasks[taskId];



      //sau khi xoa
      // console.log("sau khi xoa",newState.tasks[taskId] )

      TaskHelpers.HandleDeletingTask(renderedBoard, listId, taskId)
        .then(() => {
          console.log("coi no co con k", taskId);
          setRenderedBoard(newState);
          delete newState.tasks[taskId];
        })
        .catch((error) => console.log(error));
    }
  };

  

  return (
    <Modal className={classes.modal} open={open} onClose={() => handleClose()}>
      <div className={classes.container}>
        <Grid className={classes.gridContainer} container>
          {/* image - close button */}
          <Grid
            className={classes.gridItem}
            item
            container
            justify="flex-end"
            xs={12}
          >
            <IconButton
              onClick={() => handleClose()}
              className={classes.closeButton}
              aria-label="delete"
            >
              <Clear />
            </IconButton>
            {coverImage && (
              <img
                className={classes.image}
                src={coverImage + "&w=1280&q=80"}
                alt="cover-img"
              />
            )}
          </Grid>
          {/*this is the left side of modal in big screens */}
          <Grid className={classes.gridItem} item container sm={8} xs={12}>
            <Grid item container xs={12} className={classes.taskTitleWrapper}>
              <Grid
                item
                xs={10}
                style={{ marginBottom: displayEditTitle ? "12px" : "0px" }}
              >
                {displayEditTitle ? (
                  <EditInput
                    handleClose={closeEditTitle}
                    editInput={editTitle}
                    value={taskTitle}
                    label="Title"
                  />
                ) : (
                  <Typography className={classes.taskTitle}>
                    {taskTitle}
                  </Typography>
                )}
              </Grid>
              <Grid
                item
                container
                justify="flex-end"
                alignItems="flex-start"
                xs={2}
              >
                <IconButton
                  onClick={handleEditTitleButtonClick}
                  className={classes.editButton}
                >
                  <Edit style={{ fontSize: "1rem" }} />
                </IconButton>
              </Grid>
            </Grid>
           
            {/*inlist - inprogress */}
            <Grid item container xs={12}>
              <Grid item>
                <Typography
                  style={{ color: "#BDBDBD" }}
                  className={classes.listTitle}
                >
                  in list
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography
                  style={{ marginLeft: "8px" }}
                  className={classes.listTitle}
                >
                  {listTitle}
                </Typography>
              </Grid>
            </Grid>

            {/* status of tasks */}
 
            <Grid item container xs={12} style={{ marginBottom: "16px" }}>
            <HorizontalNonLinearStepper 
            status={status}
            statusTask={statusTask}
            setStatus={setStatus}
            editStatus={editStatus}
            handleStatusChange={handleStatusChange}
            
            >
              </HorizontalNonLinearStepper> 
            </Grid>
            {/* labels */} 
            {labels && (
              <Grid
                item
                container
                spacing={3}
                xs={12}
                style={{ marginBottom: "16px" }}
              >
                {labels.map((label, key) => {
                  return (
                    <Grid
                      style={{ minWidth: "95px", maxWidth: "115px" }}
                      key={key}
                      item
                      xs
                    >
                      <Label
                        text={label.input}
                        id={label.id}
                        deleteLabel={deleteLabel}
                        color={label.color.hex}
                        style={{ width: "100%" }}
                      >
                        {label.input}
                      </Label>
                    </Grid>
                  );
                })}
              </Grid>
            )}

            
            
            {/* start */}


            <Grid item container xs={12} style={{ marginBottom: "16px" }}>
              <Grid
                item
                container
                alignItems="center"
                style={{ width: "100px" }}
              >
                <SectionTitle title="Start Time" icon="description" />
              </Grid>
              <Grid item xs={2}>
                <LightButton
                  handleClick={handleEditStartClick}
                  icon="edit"
                  text="Change"
                />
              </Grid>
            </Grid>

            <Grid
              style={{
                display: displayEditStart ? "none" : "flex",
                marginBottom: "24px",
              }}
              item
              container
              xs={12}
            >
              <Typography className={classes.description}>
                {convert_date_to_string(start)}
              </Typography>
            </Grid>

            <Grid
              style={{
                display: displayEditStart ? "flex" : "none",
                marginBottom: "24px",
              }}
              item
              container
              xs={12}
            >
              
              <TimeStart
                editStart={editStart}
                value={dayStart}
                handleChange={handleStartChange}
                handleClose={handleCloseStart}
              
              />
             
                  
            </Grid>
            {/* finish */}

            <Grid item container xs={12} style={{ marginBottom: "16px" }}>
              <Grid
                item
                container
                alignItems="center"
                style={{ width: "100px" }}
              >
                <SectionTitle title="Finish Time" icon="description" />
              </Grid>
              <Grid item xs={2}>
                <LightButton
                  handleClick={handleEditDatePickerClick}
                  icon="edit"
                  text="Change"
                />
              </Grid>
            </Grid>
            

            <Grid
              style={{
                display: displayEditDatePicker ? "none" : "flex",
                marginBottom: "24px",
              }}
              item
              container
              xs={12}
            >
              <Typography className={classes.description}>
                {convert_date_to_string(deadline)}
              </Typography>
            </Grid>

            <Grid
              style={{
                display: displayEditDatePicker ? "flex" : "none",
                marginBottom: "24px",
              }}
              item
              container
              xs={12}
            >
              
              <DatePickerInput
                editDatePicker={editDatePicker}
                value={datePicker}
                handleChange={handleDatePickerChange}
                handleClose={handleCloseDatePicker}
              
              />
             
                  
            </Grid>
            {/*description - edit */}
            <Grid item container xs={12} style={{ marginBottom: "16px" }}>
              <Grid
                item
                container
                alignItems="center"
                style={{ width: "100px" }}
              >
                <SectionTitle title="Description" icon="description" />
              </Grid>
              <Grid item xs={2}>
                <LightButton
                  handleClick={handleEditButtonClick}
                  icon="edit"
                  text="Edit"
                />
              </Grid>
            </Grid>
            {/*description itself */}
            <Grid
              style={{
                display: displayEditArea ? "none" : "flex",
                marginBottom: "24px",
              }}
              item
              container
              xs={12}
            >
              <Typography className={classes.description}>
                {description}
              </Typography>
            </Grid>

            

            {/*edit description */}
            <Grid
              style={{
                display: displayEditArea ? "flex" : "none",
                marginBottom: "24px",
              }}
              item
              container
              xs={12}
            >
              <EditInput
                value={description}
                editInput={editDescription}
                handleClose={closeEditArea}
                label="Description"
              />
            </Grid>

            {/* todolist */}
            <Grid className='todo-app' item container xs={12} style={{ marginBottom: "16px" }}>
              <SubtaskInput handleButtonClick={submitsubtask} />
              <Grid  >
              {subtask &&
                subtask.map((val, key) => {
                  return (
                    <ListTodo
                    subtask={subtask} 
                      key={key}
                      comment={val}
                      editSubtask={editSubtask}
                      deleteSubtask={deleteSubtask}
                    />
                  );
                })}
            </Grid>
            </Grid>

           

            {/* Attachment - Add */}
            <Grid item container xs={12} style={{ marginBottom: "16px" }}>
              <Grid
                item
                container
                alignItems="center"
                style={{ width: "100px" }}
              >
                <SectionTitle title="Attachment" icon="description" />
              </Grid>
              <Grid item xs={2}>
                <input
                  id="icon-button-file"
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleFileUpload}
                />
                <label htmlFor="icon-button-file">
                  <IconButton
                    aria-label="upload file"
                    component="span"
                    className={classes.uploadButton}
                  >
                    <Add className={classes.uploadButtonIcon} />
                    <Typography
                      style={{ marginLeft: "8px" }}
                      className={classes.uploadButtonText}
                    >
                      Add
                    </Typography>
                  </IconButton>
                </label>
              </Grid>
              <Grid
                style={{
                  marginTop: "8px",
                  display: displayProgress ? "block" : "none",
                }}
                item
                xs={12}
              >
                <LinearProgress />
              </Grid>
              <Grid
                style={{
                  marginTop: "8px",
                  display: uploadError ? "block" : "none",
                }}
                item
                xs={12}
              >
                <Typography className={classes.uploadError}>
                  {uploadError}
                </Typography>
              </Grid>
            </Grid>
            {/*  attachment itself*/}
            <Grid item container xs={12}>
              <Grid item xs={12} style={{ marginBottom: "16px" }}>
                {attachments &&
                  attachments.map((attachment, key) => {
                    if (imageFormats.includes(attachment.fileType)) {
                      return (
                        <Attachment
                          key={key}
                          id={attachment.id}
                          title={attachment.name}
                          date={attachment.uploadDate}
                          image={true}
                          fileUrl={attachment.fileUrl}
                          coverImage={coverImage}
                          deleteAttachment={deleteAttachment}
                          addImageToTask={addImageToTask}
                        />
                      );
                    } else {
                      return (
                        <Attachment
                          key={key}
                          id={attachment.id}
                          title={attachment.name}
                          date={attachment.uploadDate}
                          fileUrl={attachment.fileUrl}
                          fileType={attachment.fileType}
                          deleteAttachment={deleteAttachment}
                        />
                      );
                    }
                  })}
              </Grid>
            </Grid>
            
            

            {/* show todo list  */}
            


             {/*  to do list chua co data */}
            {/* <div className='todo-app'>
             <TodoList />
              </div> */}
            
            {/*  write a comment*/}
            {/* truyen tham so submitComment */}
            <Grid item container xs={12} style={{ marginBottom: "8px" }}>
              <CommentInput handleButtonClick={submitComment} />
            </Grid>
            

            {/* show comments */}
            <Grid item container xs={12}>
              {comments &&
                comments.map((val, key) => {
                  return (
                    <Comment
                      key={key}
                      comment={val}
                      deleteComment={deleteComment}
                      editComment={editComment}
                    />
                  );
                })}
            </Grid>

          </Grid>



          {/*this is the right side of modal in big screens */}
          <Grid
            className={classes.gridItem}
            item
            container
            sm={4}
            xs={12}
            style={{ display: "table" }}
          >
            {/*section title - Actions */}
            <Grid
              item
              container
              justify="flex-start"
              className={classes.sectionTitleContainer}
            >
              <SectionTitle title="Actions" icon="people" />
            </Grid>
            {/*Assign Members */}
            {!assigments.length > 0 && (
              <Grid
                className={classes.buttonContainer}
                item
                container
                justify="flex-end"
                xs={6}
                sm={12}
              >
                <GrayButton
                  icon="people"
                  text="Members"
                  handleClick={handleMemberButtonClick}
                />
                <AssignMemberMenu
                  anchorEl={memberAnchorEl}
                  handleClose={handleMemberMenuClose}
                  assigments={assigments}
                  assignMemberToTask={assignMemberToTask}
                  removeAssignedMember={removeAssignedMember}
                />
              </Grid>
            )}
            {/*Labels */}
            <Grid
              className={classes.buttonContainer}
              item
              container
              sm={12}
              xs={6}
            >
              <GrayButton
                icon="label"
                text="Labels"
                handleClick={handleLabelButtonClick}
              />
              <LabelsMenu
                anchorEl={labelAnchorEl}
                handleClose={handleLabelMenuClose}
                addLabel={addLabel}
              />
            </Grid>
            {/*Cover */}
            <Grid
              className={classes.buttonContainer}
              item
              container
              justify="flex-end"
              xs={6}
              sm={12}
            >
              <GrayButton
                icon="cover"
                text="Cover"
                handleClick={handleCoverButtonClick}
              />
              <CoverMenu
                anchorEl={coverAnchorEl}
                handleClose={handleCoverMenuClose}
                handleImageClick={addImageToTask}
              />
            </Grid>

            {/* delte task */}

            <Grid
              className={classes.buttonContainer}
              item
              container
              justify="flex-end"
              xs={6}
              sm={12}
            >
              <GrayButton
                icon="delete"
                text="Delete Task"
                handleClick={handleDeleteTaskButtonClick}
                onClick={() => handleBoardClick(renderedBoard.id)} 
                
               
              />
              {/* <button 
               handleClick={handleDeleteTaskButtonClick}
               onClick={() => handleBoardClick(renderedBoard.id)}       
              >Delete Task</button> */}
              
            </Grid>
            
            {/* Members */}
            {assignedUsers && assignedUsers.length > 0 && (
              <Grid
                style={{ maxHeight: "400px" }}
                item
                container
                xs={12}
                direction="column"
              >
                <Grid
                  item
                  container
                  justify="flex-start"
                  className={classes.sectionTitleContainer}
                >
                  <SectionTitle title="Members" icon="people" />
                </Grid>
                {assignedUsers.map((user, index) => {
                  return (
                    <Grid
                      index={index}
                      className={classes.assignedUsersContainer}
                      container
                      onClick={() => removeAssignedMember(user.uid)}
                    >
                      <Grid item container sm xs={8} className={classes.member}>
                        <Grid item xs style={{ maxWidth: "32px" }}>
                          <UserAvatar user={user} styles={classes.avatar} />
                        </Grid>
                        <Grid
                          item
                          container
                          alignItems="center"
                          xs
                          style={{ maxWidth: "180px" }}
                        >
                          <Typography className={classes.name}>
                            {user.name}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  );
                })}
                <Grid
                  className={classes.assignButtonContainer}
                  item
                  container
                  justify="flex-end"
                  style={{ marginTop: "12px" }}
                  xs={12}
                >
                  <IconButton
                    className={classes.assignMemberButton}
                    onClick={handleMemberButtonClick}
                  >
                    <Typography className={classes.assignMemberButtonText}>
                      Assign a member
                    </Typography>
                    <Add style={{ color: "#2F80ED" }} />
                  </IconButton>
                  <AssignMemberMenu
                    anchorEl={memberAnchorEl}
                    handleClose={handleMemberMenuClose}
                    assigments={assigments}
                    assignMemberToTask={assignMemberToTask}
                  />
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </div>
    </Modal>
  );
};

export default EditTaskModal;
