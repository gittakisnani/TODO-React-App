import React, {createContext, useContext, useState} from 'react'


const SideBarContext = createContext({})
export const SideBarProvider = ({ children }) => {
    const [sideBar, setSideBar] = useState(false)
  return (
    <SideBarContext.Provider value={{
        sideBar, setSideBar
    }}>
        {children}
    </SideBarContext.Provider>
  )
}
export const useSideBarContext = () => useContext(SideBarContext)
export default SideBarContext