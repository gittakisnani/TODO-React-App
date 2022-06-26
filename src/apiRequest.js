export const fetchTasks = async (url, fn, errorFn) => {
    try {
        const response = await fetch(url);
        if(!response.ok) throw new Error ('Did Not Receive expected data, please reload the app.')
        const tasksList = await response.json()
        fn(tasksList)
        errorFn(null)
    } catch(err) {  
        errorFn(err.message)
    }
}

const apiRequest = async (url, optionsObj, setErrFn) => {
    try {
      const response = await fetch(url, optionsObj)
      if(!response.ok) throw new Error(`Unexpected Response! please try later`)
      setErrFn(null)
    } catch (err) {
      setErrFn(err.message)
    }
}

export default apiRequest