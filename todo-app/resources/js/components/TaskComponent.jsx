import React, { useState, useEffect } from "react";
import axios from "axios";

const containerStyle = {
   maxWidth: "600px",
   margin: "0 auto",
   padding: "16px",
   backgroundColor: "white",
   boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
   borderRadius: "8px",
};

const headingStyle = {
   fontSize: "24px",
   fontWeight: "bold",
   marginBottom: "16px",
   textAlign: "center",
};

const inputStyle = {
   flex: "1",
   padding: "8px",
   border: "1px solid #d1d5db",
   borderRadius: "8px 0 0 8px",
   outline: "none",
   boxShadow: "inset 0 1px 2px rgba(0, 0, 0, 0.1)",
   transition: "border-color 0.3s ease, box-shadow 0.3s ease",
};

const buttonStyle = {
   padding: "8px 16px",
   backgroundColor: "#3b82f6",
   color: "white",
   border: "none",
   borderRadius: "0 8px 8px 0",
   cursor: "pointer",
   transition: "background-color 0.3s ease",
};

const buttonHoverStyle = {
   backgroundColor: "#2563eb",
};

const listStyle = {
   listStyleType: "disc",
   paddingLeft: "20px",
   marginTop: "0",
   marginBottom: "0",
};

const listItemStyle = {
   display: "flex",
   alignItems: "center",
   justifyContent: "space-between",
   padding: "8px",
   border: "1px solid #e5e7eb",
   borderRadius: "8px",
   marginBottom: "8px",
};

const completedStyle = {
   textDecoration: "line-through",
   color: "#9ca3af",
};

const checkboxStyle = {
   marginRight: "8px",
};

const deleteButtonStyle = {
   color: "#ef4444",
   border: "none",
   background: "none",
   cursor: "pointer",
   transition: "color 0.3s ease",
};

const deleteButtonHoverStyle = {
   color: "#dc2626",
};

const showAllButtonStyle = {
   marginTop: "16px",
   padding: "8px 16px",
   backgroundColor: "#f3f4f6",
   color: "#374151",
   border: "none",
   borderRadius: "8px",
   cursor: "pointer",
   transition: "background-color 0.3s ease",
};

const showAllButtonHoverStyle = {
   backgroundColor: "#e5e7eb",
};

function TaskComponent() {
   const [tasks, setTasks] = useState([]);
   const [newTask, setNewTask] = useState("");

   useEffect(() => {
      fetchTasks();
   }, []);

   const fetchTasks = () => {
      axios
         .get("/tasks")
         .then(response => {
            setTasks(response.data.data);
         })
         .catch(error => {
            console.error("Error fetching tasks:", error);
         });
   };

   const addTask = () => {
      if (newTask.trim() === "") return;

      axios
         .post("/tasks", { title: newTask })
         .then(() => {
            fetchTasks();
            setNewTask("");
         })
         .catch(error => {
            console.error("Error adding task:", error);
         });
   };

   const markAsCompleted = id => {
      axios
         .put(`/tasks/${id}`, { is_completed: 1 }) // Set 'completed' to 1 to mark the task as completed
         .then(() => {
            fetchTasks(); // Refresh the task list after successfully marking the task as completed
         })
         .catch(error => {
            console.error("Error marking task as completed:", error);
         });
   };

   const confirmDelete = id => {
      if (confirm("Are you sure to delete this task?")) {
         axios
            .delete(`/tasks/${id}`)
            .then(() => {
               fetchTasks();
            })
            .catch(error => {
               console.error("Error deleting task:", error);
            });
      }
   };

   return (
      <div style={containerStyle}>
         <h2 style={headingStyle}>Simple To Do List App</h2>
         <div style={{ marginBottom: "16px", display: "flex" }}>
            <input
               type="text"
               value={newTask}
               onChange={e => setNewTask(e.target.value)}
               onKeyPress={e => e.key === "Enter" && addTask()}
               placeholder="Enter task"
               style={inputStyle}
               onFocus={e =>
                  (e.target.style.boxShadow =
                     "0 0 0 2px rgba(59, 130, 246, 0.5)")}
               onBlur={e =>
                  (e.target.style.boxShadow =
                     "inset 0 1px 2px rgba(0, 0, 0, 0.1)")}
            />
            <button
               onClick={addTask}
               style={buttonStyle}
               onMouseOver={e =>
                  (e.target.style.backgroundColor =
                     buttonHoverStyle.backgroundColor)}
               onMouseOut={e =>
                  (e.target.style.backgroundColor =
                     buttonStyle.backgroundColor)}
            >
               Add Task
            </button>
         </div>
         <ul style={listStyle}>
            {tasks.map(task => (
               <li key={task.id} style={listItemStyle}>
                  <span style={task.is_completed ? completedStyle : {}}>
                     {task.title}
                  </span>
                  <div
                     style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                     }}
                  >
                     {!task.is_completed && (
                        <input
                           type="checkbox"
                           checked={false} // Ensure it's unchecked initially
                           onChange={() => markAsCompleted(task.id)}
                           style={checkboxStyle}
                        />
                     )}
                     <button
                        onClick={() => confirmDelete(task.id)}
                        style={deleteButtonStyle}
                        onMouseOver={e =>
                           (e.target.style.color =
                              deleteButtonHoverStyle.color)}
                        onMouseOut={e =>
                           (e.target.style.color = deleteButtonStyle.color)}
                     >
                        Delete
                     </button>
                  </div>
               </li>
            ))}
         </ul>
         <button
            onClick={fetchTasks}
            style={showAllButtonStyle}
            onMouseOver={e =>
               (e.target.style.backgroundColor =
                  showAllButtonHoverStyle.backgroundColor)}
            onMouseOut={e =>
               (e.target.style.backgroundColor =
                  showAllButtonStyle.backgroundColor)}
         >
            Show All Tasks
         </button>
      </div>
   );
}

export default TaskComponent;
