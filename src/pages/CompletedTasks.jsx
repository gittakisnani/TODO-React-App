import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regStar } from '@fortawesome/free-regular-svg-icons';
import { filteredCompletedTasksAndSort } from '../sortAndFilter'
import { handleEdit } from '../editFunctions';
import { useTasksContext } from '../contexts/TasksContext';
import { useThemeContext } from '../contexts/ThemeContext';

const CompletedTasks = () => {
    const { tasks, loadError, setLoadError } = useTasksContext();
    const [completedTasks, setCompletedTasks] = useState([])

    const { textAndIconsColor } = useThemeContext();

    useEffect(() => setCompletedTasks(tasks.filter(task => task.completed )), [setCompletedTasks, tasks])

    return (
        <div className='h-full'>
        {loadError && <p className='flex items-center justify-center h-full w-full text-2xl text-red-600'>{loadError}</p>}
        {!loadError && !filteredCompletedTasksAndSort(completedTasks, 'completed').length && <p className='flex items-center justify-center h-full w-full text-2xl' style={{color: '#' + textAndIconsColor}}>No Completed Tasks Today</p>}
        {filteredCompletedTasksAndSort(completedTasks, 'completed') && <ul className='list-none m-4'>
        {filteredCompletedTasksAndSort(completedTasks, 'completed').map(({ id, task, fav, completed }) => (
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
            onChange={() => handleEdit(completedTasks, id, 'completed', setCompletedTasks, setLoadError)}
            />
            <label 
            htmlFor={id}
            className='flex-1 text-start'
            style={{textDecoration: completed ? 'line-through' : '' }}
            >{task}</label>
            <div 
            className='cursor-pointer'
            type='button'
            >
              {!fav && <FontAwesomeIcon icon={regStar} 
                color={'#' + textAndIconsColor}
                onClick={() => handleEdit(completedTasks, id, 'fav', setCompletedTasks, setLoadError)}
              />} 
              {fav && <FontAwesomeIcon icon={solidStar} 
                color={'#' + textAndIconsColor}
                onClick={() => handleEdit(completedTasks, id, 'fav', setCompletedTasks, setLoadError)}
              />}
            </div>
          </li>
        ))}
      </ul>}
    </div>
    )
}

export default CompletedTasks