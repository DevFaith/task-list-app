import React, { useState, useEffect } from 'react';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (title && content && content.length <= 250) {
      if (editTaskId !== null) {
        const updatedTasks = tasks.map((task) =>
          task.id === editTaskId ? { ...task, title, content } : task
        );
        setTasks(updatedTasks);
        setEditTaskId(null);
      } else {
        const newTask = {
          id: Date.now(),
          title,
          content,
          done: false,
        };
        setTasks([...tasks, newTask]);
      }
      setTitle('');
      setContent('');
    }
  };

  const handleEditTask = (task) => {
    setTitle(task.title);
    setContent(task.content);
    setEditTaskId(task.id);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleToggleDone = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, done: !task.done } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="min-h-screen bg-blue-900 flex flex-col justify-center p-7">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="w-full p-4">
            <h1 className="text-xl font-semibold text-gray-700 text-center">Task List App</h1>
            <div className="mt-4">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="w-full p-2 border rounded mt-2"
              />
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Content (250 characters max)"
                className="w-full p-2 border border-gray-300 rounded mt-2"
                maxLength="250"
              ></textarea>
              <button
                onClick={handleAddTask}
                className="w-full p-2 bg-blue-500 text-white rounded mt-2 border-none"
              >
                {editTaskId !== null ? 'Update Task' : 'Add Task'}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 w-full md:w-1/2 mx-auto">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-white border rounded mb-2 shadow-md ${
              task.done ? 'bg-green-100' : ''
            }`}
          >
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{task.title}</h2>
              <p>{task.content}</p>
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-2 mt-2 md:mt-0">
              <button
                onClick={() => handleToggleDone(task.id)}
                className={`p-2 rounded ${
                  task.done ? 'bg-yellow-500 text-white' : 'bg-green-500 text-white'
                }`}
              >
                {task.done ? 'Undone' : 'Done'}
              </button>
              <button
                onClick={() => handleEditTask(task)}
                className="p-2 bg-blue-500 text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="p-2 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
