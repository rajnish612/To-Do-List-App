import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, TextField, CircularProgress } from '@mui/material';

function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [task, setTask] = useState({
    title: '',
    content: ''
  });

  useEffect(() => {
    fetchTask();
  }, []);

  const fetchTask = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/${id}`);
      setTask(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch task. Please try again.');
      setLoading(false);
      console.error('Error fetching task:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/update/${id}`, task);
      alert('Task updated successfully!');
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Error updating task');
      console.error('Error updating task:', err);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <CircularProgress />
        <p>Loading task...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <Button variant="contained" color="primary" onClick={fetchTask}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="edit-container fade-in">
      <form onSubmit={handleSubmit} className="edit-form">
        <h2>Edit Task</h2>
        
        <TextField
          fullWidth
          label="Title"
          name="title"
          value={task.title}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          required
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.3)',
              },
              '&:hover fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.5)',
              },
            },
            '& .MuiInputLabel-root': {
              color: 'rgba(255, 255, 255, 0.7)',
            },
            '& .MuiInputBase-input': {
              color: 'white',
            },
          }}
        />

        <TextField
          fullWidth
          label="Content"
          name="content"
          value={task.content}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          required
          multiline
          rows={4}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.3)',
              },
              '&:hover fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.5)',
              },
            },
            '& .MuiInputLabel-root': {
              color: 'rgba(255, 255, 255, 0.7)',
            },
            '& .MuiInputBase-input': {
              color: 'white',
            },
          }}
        />

        <div className="edit-buttons">
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ marginRight: 2 }}
          >
            Update Task
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate('/dashboard')}
            sx={{
              borderColor: 'rgba(255, 255, 255, 0.3)',
              color: 'white',
              '&:hover': {
                borderColor: 'rgba(255, 255, 255, 0.5)',
              },
            }}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Edit;