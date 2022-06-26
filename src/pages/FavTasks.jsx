import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regStar } from '@fortawesome/free-regular-svg-icons';
import { useTasksContext } from '../contexts/TasksContext';
import { useThemeContext } from '../contexts/ThemeContext';
import { handleEdit } from '../editFunctions';

const FavTasks = () => {
    const { tasks, loadError, setLoadError } = useTasksContext()
    const [favTasks, setFavTasks] = useState([])

    const { textAndIconsColor } = useThemeContext();

    useEffect(() => setFavTasks(tasks.filter(task => task.fav)), [setFavTasks, tasks])
    
    return (
      <div className='h-full'>
      {loadError && <p className='flex items-center justify-center h-full w-full text-2xl text-red-600'>{loadError}</p>}
      {!loadError && favTasks.length === 0 && <p className='flex items-center justify-center h-full w-full text-2xl' style={{color: '#' + textAndIconsColor}}>No Important Tasks to show!</p>}
      {!loadError && favTasks && <ul className='list-none m-4'>
        {favTasks.map(({ id, task, fav, completed }, index) => (
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
            onChange={() => handleEdit(favTasks, id, 'completed', setFavTasks, setLoadError)}
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
                onClick={() => handleEdit(favTasks, id, 'fav', setFavTasks, setLoadError)}
              />} 
              {fav && <FontAwesomeIcon icon={solidStar} 
              color={'#' + textAndIconsColor}
                onClick={() => handleEdit(favTasks, id, 'fav', setFavTasks, setLoadError)}
              />}
            </div>
          </li>
        ))}
      </ul>}
        </div>
    )
}

export default FavTasks