import React, { useState, useEffect, useCallback } from 'react'
import { fetchTasks } from '../apiRequest'
import { getDaysTasks } from '../sortAndFilter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as solidStar, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faStar as regStar } from '@fortawesome/free-regular-svg-icons'
import { filteredNotCompletedAndSort } from '../sortAndFilter'
import { handleEdit, handleDelete, requestAction } from '../editFunctions'
import { useTasksContext } from '../contexts/TasksContext'
import { useThemeContext } from '../contexts/ThemeContext';
import Modal from '../Modal'

const SevenDaysTasks = () => {
  const { 
    tasks, 
    loadError, setLoadError,
    showPopUp, setShowPopUp,
    popUpQuery, setPopUpQuery,
    deleteId, setDeleteId,
    recentlyDeleted, setRecentlyDeleted
  } = useTasksContext();

  const { textAndIconsColor } = useThemeContext();

  const [sevenDaysTasks, setSevenDaysTasks] = useState([])

  useEffect(() => setSevenDaysTasks(tasks), [setSevenDaysTasks, tasks])

  const sevenDaysTasksSorted = useCallback(() => {
      const tasksList = filteredNotCompletedAndSort(sevenDaysTasks)
      return getDaysTasks(tasksList, 7)
  }, [sevenDaysTasks])

  return (
    <div className='h-full'>
        <p 
        className='bg-green-500 text-white px-4 py-2 transition-all duration-300'
        style={{ display: recentlyDeleted ? 'block' : 'none', opacity: recentlyDeleted? '1' : '0'}}
        >
        Task Deleted successfully
        </p>
        {loadError && <p className='flex items-center justify-center h-full w-full text-2xl text-red-600'>{loadError}</p>}
        {!loadError && !sevenDaysTasksSorted().length && <p className='flex items-center justify-center h-full w-full text-2xl' 
        style={{color: '#' + textAndIconsColor}}>No Tasks this week!</p>}
        {!loadError && sevenDaysTasksSorted() && <ul className='list-none m-4'>
        {sevenDaysTasksSorted().filter(task => !task.completed).map(({ id, task, fav, completed, lastDate }, index) => (
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
            onChange={() => handleEdit(sevenDaysTasks, id, 'completed', setSevenDaysTasks, setLoadError)}
            />
            <label 
            htmlFor={id}
            className='flex-1 text-star flex items-center justify-between'
            style={{textDecoration: completed ? 'line-through' : '' }}
            >
            <span>{task}</span>
            <span>{lastDate} to go.</span>
            </label>
            <div 
            className='cursor-pointer flex items-center'
            type='button'
            >
              {!fav && <FontAwesomeIcon icon={regStar} 
              color={'#' + textAndIconsColor}
                onClick={() => handleEdit(sevenDaysTasks, id, 'fav', setSevenDaysTasks, setLoadError)}
              />} 
              {fav && <FontAwesomeIcon icon={solidStar} 
              color={'#' + textAndIconsColor}
                onClick={() => handleEdit(sevenDaysTasks, id, 'fav', setSevenDaysTasks, setLoadError)}
              />}
              <FontAwesomeIcon 
              icon={faTrashAlt} 
              color={'#' + textAndIconsColor}
              className='ml-4' 
              title='Delete Task'
              onClick={ () => requestAction('Deleted', id, setShowPopUp, setPopUpQuery, setDeleteId) }
              />
            </div>
          </li>
        ))}
      </ul>}
      <Modal showPopUp={showPopUp} onBtnsClick={() => setShowPopUp(false)} onAcceptRequest={() => handleDelete(sevenDaysTasks, deleteId, setSevenDaysTasks, fetchTasks, setLoadError, setRecentlyDeleted)}>
          {popUpQuery}
      </Modal>
    </div>
  )
}

export default SevenDaysTasks