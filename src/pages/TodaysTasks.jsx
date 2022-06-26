import React, {useEffect, useState, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as regStar } from '@fortawesome/free-regular-svg-icons';
import  { fetchTasks } from '../apiRequest';
import { filteredNotCompletedAndSort, getDaysTasks } from '../sortAndFilter';
import { handleEdit } from '../editFunctions';
import { handleDelete, requestAction } from '../editFunctions';
import { useTasksContext } from '../contexts/TasksContext';
import { useThemeContext } from '../contexts/ThemeContext';
import Modal from '../Modal';

const TodaysTasks = () => {
  const API_URL = 'http://localhost:3500/tasks'

  const { 
    tasks, setTasks, 
    loadError, setLoadError,
    showPopUp, setShowPopUp,
    popUpQuery, setPopUpQuery,
    deleteId, setDeleteId,
    recentlyDeleted, setRecentlyDeleted
  } = useTasksContext()

  const [todayTasks, setTodayTasks] = useState([])

  useEffect(() => {
      setTodayTasks(tasks);
  }, [tasks])

  const getTodayTasks = useCallback(() => {
    const tasksList = filteredNotCompletedAndSort(todayTasks)
    return getDaysTasks(tasksList, 1)
  }, [todayTasks])

  const { textAndIconsColor } = useThemeContext();


  return (
    <div className='h-full'>
    <p 
    className='bg-green-500 text-white px-4 py-2 transition-all duration-300'
    style={{ display: recentlyDeleted ? 'block' : 'none', opacity: recentlyDeleted? '1' : '0'}}
    >
    Task Deleted successfully
    </p>
    {loadError && <p className='flex items-center justify-center h-full w-full text-2xl text-red-600'>{loadError}</p>}
    {!loadError && !getTodayTasks().length && <p className='flex items-center justify-center h-full w-full text-2xl'
    style={{color: '#' + textAndIconsColor}}>No Tasks Today</p>}
     {!loadError && getTodayTasks() && <ul className='list-none m-4'>
        {getTodayTasks().filter(task => !task.completed).map(({ id, task, fav, completed, date }, index) => (
          <li 
          key={id}
          className='my-2 flex items-center gap-4 bg-slate-400 p-2 justify-between'
          >
            <input 
            type="checkbox" 
            value={task} 
            id={id} 
            style={{width: '20px', height: '20px', cursor: 'pointer',}}  
            checked={completed}
            onChange={() => handleEdit(tasks, id, 'completed', setTasks, setLoadError)}
            />
            <label 
            htmlFor={id}
            className='flex-1 text-start'
            style={{textDecoration: completed ? 'line-through' : '' }}
            >{task}</label>
            <div 
            className='cursor-pointer flex items-center'
            type='button'
            >
              {!fav && <FontAwesomeIcon icon={regStar} 
              color={'#' + textAndIconsColor}
                onClick={() => handleEdit( tasks, id, 'fav', setTasks, setLoadError)}
              />} 
              {fav && <FontAwesomeIcon icon={solidStar} 
              color={'#' + textAndIconsColor}
                onClick={() => handleEdit( tasks, id, 'fav', setTasks, setLoadError)}
              />}
              <FontAwesomeIcon 
              color={'#' + textAndIconsColor}
              icon={faTrashAlt} 
              className='ml-4' 
              title='Delete Task'
              onClick={ () => requestAction('Deleted', id, setShowPopUp,setPopUpQuery, setDeleteId) }
              />
            </div>
          </li>
        ))}
      </ul>}
        <Modal showPopUp={showPopUp} onBtnsClick={() => setShowPopUp(false)} onAcceptRequest={() => handleDelete(tasks, deleteId, setTasks, fetchTasks, setLoadError, setRecentlyDeleted)}>
          {popUpQuery}
        </Modal>
    </div>
  )
}

export default TodaysTasks