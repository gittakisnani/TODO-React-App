import React, { useState, useEffect, useCallback } from 'react'
import { filteredNotCompletedAndSort, getDaysTasks } from '../sortAndFilter';
import { handleDelete, requestAction } from '../editFunctions';
import { useTasksContext } from '../contexts/TasksContext';
import { useThemeContext } from '../contexts/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faAngry } from '@fortawesome/free-regular-svg-icons'
import { fetchTasks } from '../apiRequest';
import Modal from '../Modal';

const MissedTasks = () => {
  const { 
    tasks, 
    loadError, setLoadError,
    showPopUp,setShowPopUp,
    popUpQuery, setPopUpQuery,
    deleteId, setDeleteId, 
    recentlyDeleted, setRecentlyDeleted
  } = useTasksContext()

  const [missedTasks, setMissedTasks] = useState([])

  const { textAndIconsColor } = useThemeContext();

  useEffect(() => setMissedTasks(tasks.filter(task => !task.completed)), [setMissedTasks, tasks])

  const allMissedTasks = useCallback(() => {
    const tasksList = filteredNotCompletedAndSort(missedTasks)
    return getDaysTasks(tasksList, -1, 365)
  }, [missedTasks])

  return (
    <div className='h-full'>
    <p 
    className='bg-green-500 text-white px-4 py-2 transition-all duration-300'
    style={{ display: recentlyDeleted ? 'block' : 'none', opacity: recentlyDeleted? '1' : '0'}}
    >
    Task Deleted successfully
    </p>
    {loadError && <p className='flex items-center justify-center h-full w-full text-2xl text-red-600'>{loadError}</p>}
    {!loadError && !allMissedTasks().length && <p className='flex items-center justify-center h-full w-full text-2xl' style={{color: '#' + textAndIconsColor}}>No missed tasks to show, good Job!</p>}
     {!loadError && allMissedTasks() && <ul className='list-none m-4'>
        {allMissedTasks().map(({ id, task, completed, date, lastDate }) => (
          <li 
          key={id}
          className='my-2 flex items-center gap-4 bg-slate-400 p-2 justify-between'
          >
          <FontAwesomeIcon icon={faAngry} color='red' size='lg'/>
            <label 
            htmlFor={id}
            className='flex-1 text-start text-red flex items-center justify-between'
            style={{textDecoration: completed ? 'line-through' : '' }}
            >
            <span>{task}</span>
            <span>Deadline: {lastDate} ago.</span>
            </label>
            <div 
            className='cursor-pointer flex items-center'
            type='button'
            >
              <FontAwesomeIcon 
              icon={faTrashAlt} 
              color={'#' + textAndIconsColor}
              className='ml-4' 
              title='Delete Task'
              onClick={ () => requestAction('Deleted', id, setShowPopUp,setPopUpQuery, setDeleteId) }
              />
            </div>
          </li>
        ))}
      </ul>}
        <Modal showPopUp={showPopUp} onBtnsClick={() => setShowPopUp(false)} onAcceptRequest={() => handleDelete(missedTasks, deleteId, setMissedTasks, fetchTasks, setLoadError, setRecentlyDeleted)}>
          {popUpQuery}
        </Modal>
    </div>
  )
}

export default MissedTasks