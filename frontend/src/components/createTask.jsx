import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import PlusIcon from "../icons/plusicon";
import Avatar from "@mui/material/Avatar";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Alert } from "@mui/material";
import AlertTitle from "@mui/material/AlertTitle";
import Collapse from '@mui/material/Collapse';
function CreateTask() {
  let [formData, setForm] = useState({});
  let [successAlert, setSuccessAlert] = useState(false);
  let [errorAlert, setErrorAlert] = useState(false);

  let [alertMessage, setMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  async function sendFormData() {
    try {
      let res = await axios.post("http://localhost:5000/create", formData);
      setSuccessAlert((prev) => !prev);
      setMessage(res.data.message);

      setTimeout(() => {
        setSuccessAlert((prev) => !prev);
        navigate("/");
      }, 1500);
    } catch (err) {
      setMessage(err.response.data.message)
      setErrorAlert((prev)=>!prev)
      setTimeout(()=>{
      setErrorAlert((prev)=>!prev)
      },1500)

     
    }
  }

  function inputchange(e) {
    const { name, value } = e.target;
    console.log(name, value);
    setForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }
  // useEffect(()=>{

  // },[])

  return (
    <>
    <div className="alert">
    <Collapse in={successAlert} timeout={1000}>
        <Alert variant={"filled"}severity="success"     sx={{
            display: "flex",
             
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
           borderRadius: "10px",
            width: "50%",
            transition: "opacity 1s ease-in-out, transform 0.5s linear",
            transform: successAlert ? "translateY(5)" : "translateY(-70px)",
        }}>
          <AlertTitle>Success</AlertTitle>
          {alertMessage}
        </Alert>
        </Collapse>
      {/* {errorAlert && ( */}
          <Collapse in={errorAlert} timeout={1000}>
          <Alert variant={"filled"}
            severity="error"
            sx={{
              display: "flex",
             
              justifyContent: "center",
              alignItems: "center",
              position: "fixed",
             borderRadius: "10px",
              width: "50%",
              transition: "opacity 1s ease-in-out, transform 0.5s linear",
              transform: errorAlert ? "translateY(5)" : "translateY(-70px)",
            }}
          >
            <AlertTitle>Error</AlertTitle>
            {alertMessage}
          </Alert>
        </Collapse>
      
       
     
      {/* )} */}
      </div>
      <div className="create-task">
        <h1>SET UP YOUR TASK</h1>
        <div className="profile-logo">
          <Avatar
            className="Avatar"
            src="./static/photo.jpg"
            sx={{ width: 100, height: 100 }}
          />
          <PlusIcon
            sx={{
              color: "blue",
              fontSize: 30,
              position: "absolute",
              bottom: "0px",
              right: "0px",
            }}
          />
        </div>

        <div className="task-details">
          <label htmlFor="title">Task Name</label>
          <TextField
            onChange={inputchange}
            className="input"
            name="title"
            id="standard-basic"
            fullWidth
            variant="standard"
            label="Task Name" // 👈 This is the floating label
          />

          <label htmlFor="content">Content</label>
          <TextField
            onChange={inputchange}
            className="input"
            placeholder="Add Due Date"
            name="content"
            id="standard-basic "
            fullWidth
            variant="standard"
            label="Add Content"
          />
        </div>
        <Button onClick={sendFormData} className={"button"} variant="contained">
          Create Task
        </Button>
      </div>
    </>
  );
}


export default CreateTask;
