
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, CircularProgress } from "@mui/material";


function Dashboard() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Handle scroll for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch tasks
  useEffect(() => {
    fetchTasks();
  }, []);

  // Update filtered list when search term changes
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredList(list);
      return;
    }

    const filtered = list.filter(task => 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredList(filtered);
  }, [searchTerm, list]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000");
      setList(response.data);
      setFilteredList(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch tasks. Please try again later.");
      setLoading(false);
      console.error("Error fetching tasks:", err);
    }
  };

  // Delete task
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/delete/${id}`);
      setList(prev => prev.filter(el => el._id !== id));
      setFilteredList(prev => prev.filter(el => el._id !== id));
      alert(response.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Error deleting task");
      console.error("Error deleting task:", err);
    }
  };

  const handleEdit = (taskId) => {
    navigate(`/edit/${taskId}`);
  };

  const handleAddTask = () => {
    navigate("/create");
  };

  const clearSearch = () => {
    setSearchTerm('');
    setFilteredList(list);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <CircularProgress />
        <p>Loading tasks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <Button variant="contained" color="primary" onClick={fetchTasks}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <>
    <div className="sidebar">
        <div className="sidebar-content">
          <div className="sidebar-header">
            <span className="sidebar-icon">📋</span>
            <h3>Task Manager</h3>
          </div>
          <div className="sidebar-divider"></div>
        </div>
      </div>
      
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-content">
          <Link className="nav-logo">
            <span className="logo-icon">✅</span>
            <span className="logo-text">Tasks</span>
          </Link>

          <div className={`search-container ${isSearchFocused ? 'focused' : ''}`}>
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
            {searchTerm && (
              <button className="clear-search" onClick={clearSearch}>
                ✕
              </button>
            )}
          </div>

          <div className="nav-menu">
            <Link 
              to="/create" 
              className={`nav-item ${location.pathname === '/create' ? 'active' : ''}`}
            >
              <span className="nav-icon">➕</span>
              <span className="nav-label">Add Task</span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="dashboard-container fade-in">
        {filteredList.length === 0 ? (
          <div className="empty-state">
            {searchTerm ? (
              <>
                <h2>No matching tasks found</h2>
                <p>Try different search terms</p>
              </>
            ) : (
              <>
                <h2>No tasks found</h2>
                <p>Click the + button to create your first task</p>
              </>
            )}
          </div>
        ) : (
          <div className="tasks-grid">
            {filteredList.map((task, idx) => (
              <div 
                key={task._id || idx} 
                className="list-item fade-up" 
                style={{animationDelay: `${idx * 0.1}s`}}
              >
                <div className="list-content">
                  <h2>{task.title}</h2>
                  <p>{task.content}</p>
                  <small>{new Date(task.Time).toLocaleString()}</small>
                  
                  <div className="dashboard-buttons">
                    <Button
                      size="small"
                      variant="contained"
                      color="secondary"
                      className="edit-btn"
                      onClick={() => handleEdit(task._id)}
                    >
                      Edit Task
                    </Button>
                    <Button 
                      size="small" 
                      variant="contained" 
                      onClick={() => handleDelete(task._id)} 
                      color="error"
                      className="delete-btn"
                    >
                      Delete Task
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <button 
          className="addTask bounce" 
          onClick={handleAddTask}
          title="Add new task"
        >
          +
        </button>
      </div>
    </>
  );
}

export default Dashboard;
// import React, { useState, useEffect } from "react";

// import axios from "axios";
// import {Link, useLocation, useNavigate } from "react-router-dom";
// import { Button, CircularProgress } from "@mui/material";


// function Dashboard() {
//   const location = useLocation();
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [activeTab, setActiveTab] = useState('dashboard');
//   const navigate = useNavigate();
//   const [list, setList] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch tasks
//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const fetchTasks = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000");
//       setList(response.data);
//       setLoading(false);
//     } catch (err) {
//       setError("Failed to fetch tasks. Please try again later.");
//       setLoading(false);
//       console.error("Error fetching tasks:", err);
//     }
//   };

//   // Delete task
//   const handleDelete = async (id) => {
//     try {
//       const response = await axios.delete(`http://localhost:5000/delete/${id}`);
//       setList(prev => prev.filter(el => el._id !== id));
//       // Show success message
//       alert(response.data.message);
//     } catch (err) {
//       // Show error message
//       alert(err.response?.data?.message || "Error deleting task");
//       console.error("Error deleting task:", err);
//     }
//   };

//   // Handle edit navigation
//   const handleEdit = (taskId) => {
//     navigate(`/edit/${taskId}`);
//   };

//   // Handle add task navigation
//   const handleAddTask = () => {
//     navigate("/");
//   };

//   if (loading) {
//     return (
      
//       <div className="loading-container">
//         <CircularProgress />
//         <p>Loading tasks...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="error-container">
//         <h2>Error</h2>
//         <p>{error}</p>
//         <Button 
//           variant="contained" 
//           color="primary" 
//           onClick={fetchTasks}
//         >
//           Retry
//         </Button>
//       </div>
//     );
//   }

//   return (
//     <>
//     <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
//       <div className="nav-content">
//         <Link className="nav-logo">
//           <span className="logo-icon">✅</span>
//           <span className="logo-text">Tasks</span>
//         </Link>

//         <div className="nav-menu">
      
          
//           <Link 
//             to="/create" 
//             className={`nav-item ${location.pathname === '/create' ? 'active' : ''}`}
//           >
//             <span className="nav-icon">➕</span>
//             <span className="nav-label">Add Task</span>
//           </Link>
//         </div>
//       </div>
//     </nav>
//     <div className="dashboard-container fade-in">
     
      
//       {list.length === 0 ? (
//         <div className="empty-state">
//           <h2>No tasks found</h2>
//           <p>Click the + button to create your first task</p>
//         </div>
//       ) : (
//         <div className="tasks-grid">
//           {list.map((task, idx) => (
//             <div 
//               key={task._id || idx} 
//               className="list-item fade-up" 
//               style={{animationDelay: `${idx * 0.1}s`}}
//             >
//               <div className="list-content">
//                 <h2>{task.title}</h2>
//                 <p>{task.content}</p>
//                 <small>{new Date(task.Time).toLocaleString()}</small>
                
//                 <div className="dashboard-buttons">
//                   <Button
//                     size="small"
//                     variant="contained"
//                     color="secondary"
//                     className="edit-btn"
//                     onClick={() => handleEdit(task._id)}
//                   >
//                     Edit Task
//                   </Button>
//                   <Button 
//                     size="small" 
//                     variant="contained" 
//                     onClick={() => handleDelete(task._id)} 
//                     color="error"
//                     className="delete-btn"
//                   >
//                     Delete Task
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       <button 
//         className="addTask bounce" 
//         onClick={handleAddTask}
//         title="Add new task"
//       >
//         +
//       </button>
//     </div>
//     </>
//   );
// }

// export default Dashboard;