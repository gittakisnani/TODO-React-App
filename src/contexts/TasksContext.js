import React, { useState, useEffect, useContext, createContext } from 'react'
import { fetchTasks } from '../apiRequest'

const TasksContext = createContext('tasks')

export const TasksProvider = ({ children }) => {
  const API_URL = 'http://localhost:3500/tasks'
  const [tasks, setTasks] = useState([])
  const [loadError, setLoadError] = useState(null)
  const [showPopUp, setShowPopUp] = useState(false)
  const [popUpQuery, setPopUpQuery] = useState('');
  const [deleteId, setDeleteId] = useState(null)
  const [recentlyDeleted, setRecentlyDeleted] = useState(false)

  useEffect(() => {
    fetchTasks(API_URL, setTasks, setLoadError)
  }, [])

  return (
    <TasksContext.Provider value={{
      tasks, setTasks, loadError, setLoadError, showPopUp, setShowPopUp, popUpQuery, setPopUpQuery, deleteId, setDeleteId, recentlyDeleted, setRecentlyDeleted
    }}
    >
    {children}
    </TasksContext.Provider>
  )
}

export const useTasksContext = () => useContext(TasksContext)

export default TasksContext