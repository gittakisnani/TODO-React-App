import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH, faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regStar } from '@fortawesome/free-regular-svg-icons';
import Button from './Button';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom'
import { fetchTasks } from '../apiRequest';
import { useTasksContext } from '../contexts/TasksContext';
const AddNewTask = () => {
    const navigate = useNavigate()
    const API_URL = 'http://localhost:3500/tasks'
    const { tasks, setTasks, loadError, setLoadError } = useTasksContext()
    const [task, setTask] = useState('');
    const [postError, setPostError] = useState(null)
    const [showDetails, setShowDetails] = useState(true);
    const [detailsText, setDetailsText] = useState('')
    const [fav, setFav] = useState(false)
    const [date, setDate] = useState(new Date().toJSON().slice(0, 10))


    const changeTaskTitle = (e) => {
        setTask(e.target.value)
    }

    const changeDetailsText = (e) => {
        setDetailsText(e.target.value)
    }

    const changeDate = (e) => {
        setDate(e.target.value)
    }
    

    const postTask = async (task) => {
        const optionsObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        }
        try{
            const response = await fetch(API_URL, optionsObj)
            if(!response.ok) throw new Error ('Cannot save the task, please try later!')
            setPostError(null)
            fetchTasks(API_URL, setTasks, setLoadError)
        } catch(err) {
            setPostError(err.message)
        }
    }

    const canSave = [task, date].every(Boolean) && !postError

    const taskData = {
        task,
        date,
        details: showDetails ? detailsText : '',
        fav,
        completed: false,
        lastDate: formatDistanceToNow(new Date(date))
    }

    const handleSubmit = e => {
        if(!canSave) return;
        e.preventDefault();
        postTask(taskData)
        navigate('/today')
        setTask('')
        setDetailsText('')
    }


    return (
        <form 
        className='p-6 h-full'
        onSubmit={handleSubmit}
        >
            <label htmlFor="taskTitle" className='absolute -left-[1000px]'>Task Title</label>
            <div className='flex flex-col'>
                <input 
                    type="text" 
                    id='taskTitle' 
                    value={task}
                    onChange={changeTaskTitle}
                    className='outline-none border border-transparent hover:border-[#d1d1d154] focus:border-[#d1d1d1be] px-2 py-2 my-2 focus:placeholder:text-[#d1d1d1be]'
                    placeholder='Task Title'
                    autoComplete='off'
                    autoFocus
                />
                {showDetails && 
                <textarea
                className='outline-none px-2 py-2 border hover:border-[#d1d1d154] my-2 focus:placeholder:text-[#d1d1d1be] resize-none'
                placeholder='Details'
                value={detailsText}
                onChange={changeDetailsText}
                />
                }
                <div className="options flex items-center justify-between">
                    <div className='icons flex items-center gap-3 relative' >
                        <Button
                        content={<FontAwesomeIcon icon={faEllipsisH} />}
                        className='hover:bg-[#d1d1d154] px-2'
                        onClick={() => setShowDetails(prevState => !prevState)}
                        title='Details'
                        />
                        <input 
                        type="date" 
                        value={date}  
                        className='overflow-hidden block max-w-[25px] hover:bg-[#d1d1d154] outline-none'
                        onChange={changeDate}
                         />
                        <Button
                        content={
                            <>
                            {!fav && <FontAwesomeIcon icon={regStar} />}
                            {fav && <FontAwesomeIcon icon={solidStar} />}
                            </>
                        }
                        className='hover:bg-[#d1d1d154] px-2 flex items-center justify-center'
                        onClick={() => setFav(prevState => !prevState)}
                        title='Favorite'
                        />
                    </div>
                    <Button
                    content='Save'
                    className={`text-white  w-24 h-10 px-2 py-2  bg-slate-400 flex items-center justify-center ${canSave ? 'bg-slate-700 cursor-pointer' : 'cursor-not-allowed'}`}
                    disabled={!canSave}
                    type='submit'
                    />
                </div>
            </div>
        </form>
    )
}

export default AddNewTask