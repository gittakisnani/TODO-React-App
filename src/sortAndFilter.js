export const filteredCompletedTasksAndSort = (list) => {
    const notFavCompletedTasksList = list.filter(item => item.completed && !item.fav)
    const favCompletedTasks = list.filter(item => item.completed && item.fav)
    return [...favCompletedTasks, ...notFavCompletedTasksList]
}

export const filteredNotCompletedAndSort = (list) => {
    const notFavNotCompletedTasksList = list.filter(item => !item.completed && !item.fav)
    const favNotCompletedTasks = list.filter(item => !item.completed && item.fav)
    return [...favNotCompletedTasks, ...notFavNotCompletedTasksList]
}

export const getDaysTasks = ( list, numberOfDays = 30, minNumberOfDays = 0.99 ) => {
    const todayDate = new Date()
    const getDateFormat = date => date.split(/-|\//gi)
    const getDateYears = date => getDateFormat(date)[0]
    const getDateMonths = date => getDateFormat(date)[1] - 1
    const getDateDays = date => getDateFormat(date)[2]
    const newTasksList = list.filter(({date}) => {
        const taskDate = new Date(getDateYears(date), getDateMonths(date), getDateDays(date));
        return (taskDate - todayDate) * 1.157407e-8 <= numberOfDays && (taskDate - todayDate) * 1.157407e-8 >= -minNumberOfDays
    }
    )
    return [...newTasksList]
}
