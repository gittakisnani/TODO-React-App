import apiRequest from "./apiRequest"
const API_URL = 'http://localhost:3500/tasks';


export const handleEdit = async ( list, id, prop, setTaskFn, setErrFn ) => {
    const tasksList = list.map(item => item.id === id ? {...item, [prop]: !item[prop]} : item)
    setTaskFn(tasksList)
    const targetTask = list.find(task => task.id === id)
    const optionsObj = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...targetTask, [prop]: !targetTask[prop]})
    }

    apiRequest(`${API_URL}/${id}`, optionsObj, setErrFn)
}

export const handleDelete = async (list, id, setTasksFn, fetchTasksFn, setLoadErrorFn, setRecentlyDeletedFn) => {
    const tasksList = list.filter(task => task.id !== task)
    setTasksFn(tasksList)
    const optionsObj = {
      method: 'DELETE',
    }

    apiRequest(`${API_URL}/${id}`, optionsObj, setLoadErrorFn)
    fetchTasksFn(API_URL, setTasksFn, setLoadErrorFn)


    setRecentlyDeletedFn(true)

    setTimeout(() => setRecentlyDeletedFn(false), 2000)
  }

  export const requestAction = (action, id, setShowPopUp, setPopUpQuery, setDeletedId) => {
    setShowPopUp(true);
    setPopUpQuery(action)
    setDeletedId(id)
  }