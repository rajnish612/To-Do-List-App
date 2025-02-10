import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@mui/material";
function Dashboard() {
  const location = useLocation();
  let [list, setList] = useState([]);
  async function Delete(id) {
    console.log(id);
    try {
      let res = await axios.delete(`http://localhost:5000/delete/${id}`);
      alert(res.data.message);
      setList((prev) => {
        return prev.filter((el) => {
          return el._id !== id;
        });
      });
    } catch (err) {
      alert(err.response.data.message);
    }
  }
  useEffect(() => {
    async function fetchData() {
      let res = (await axios.get("http://localhost:5000")).data;

      setList(res);
      console.log(list);
    }

    fetchData();
  }, []);
  return (
    <>
     
      <div className="dashboard-container">
      <h1>Tasks</h1>
        {list.map((el, idx) => {
          return (
            <>
              <div key={idx} className="lists">
                <h2>{el.title}</h2>
                <p>{el.content}</p>
                <small>{el.Time}</small>
                <div className="dashboard-buttons">
                <Button
                  size="small"
                  variant="contained"
                  color="secondary"
                  
                >
                  EDIT TASK
                </Button>
                <Button  size="small" variant="contained" onClick={() => {
                    Delete(el._id);
                  }} color="success">
DELETE TASk
</Button>
              </div>
              </div>
             
            </>
          );
        })}
        <div className="addTask">sd</div>
      </div>
    </>
  );
}

export default Dashboard;
