import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from "./pages/Layout";
import { ThemeProvider } from './contexts/ThemeContext'
import { SideBarProvider } from "./contexts/SideBarContext";
import AddNewTask from "./components/AddNewTask";
import TodaysTasks from "./pages/TodaysTasks";
import CompletedTasks from "./pages/CompletedTasks";
import FavTasks from "./pages/FavTasks";
import SevenDaysTasks from "./pages/SevenDaysTasks";
import MissedTasks from "./pages/MissedTasks";
import { TasksProvider } from './contexts/TasksContext'
function App() {
  return (
    <ThemeProvider>
      <SideBarProvider>
        <TasksProvider>
      <>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={ <Navigate to="/today" replace={true} />} />
              <Route path="add-task" element={<AddNewTask />} />
              <Route path="today" element={<TodaysTasks />} />
              <Route path="next-seven-days" element={<SevenDaysTasks />} />
              <Route path="completed-tasks" element={<CompletedTasks />} />
              <Route path="important-tasks" element={<FavTasks />} />
              <Route path="missed-tasks" element={<MissedTasks />} />
          </Route>
        </Routes>
      </>
        </TasksProvider>
      </SideBarProvider>
    </ThemeProvider>
  );
}

export default App;
