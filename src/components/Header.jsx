import React from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faMoon, faSun, faBarsProgress, faBars } from '@fortawesome/free-solid-svg-icons'
import { useThemeContext } from '../contexts/ThemeContext'
import { useSideBarContext } from '../contexts/SideBarContext'
const Header = () => {
  const {
      theme, 
      setTheme, 
      textAndIconsColor,
      sideBarAndHeaderColor,
  } = useThemeContext();

  const { setSideBar } = useSideBarContext();

  return (
    <header 
    style={{boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', backgroundColor: '#' + sideBarAndHeaderColor}}
    className='w-full px-5 sm:px-6 md:px-8 py-3 flex justify-between items-center'
    >
    <div className='flex items-center gap-4'>
      <Button
      content={<FontAwesomeIcon icon={faBars} size='lg' color={`#${textAndIconsColor}`}  />}
      className={`hover:bg-[#d1d1d154] px-2`}
      onClick={() => setSideBar(prevState => !prevState)}
      id='toggleSB'
      />
      <Link to={'/'}>
          <h1 
          className='text-xl md:text-3xl font-semibold cursor-pointer tracking-tighter'
          style={{color: '#' + textAndIconsColor }}
          >
          TO-DO LIST
          </h1>
      </Link>
    </div>

      <nav className='max-w-[200px] flex items-center h-full justify-end'>
      <Button 
      content={<FontAwesomeIcon icon={faBarsProgress} size='lg' color={`#${textAndIconsColor}`}/> }
      title='Check Progress'
      className='mr-4'
      />
        <div className='theme flex items-center justify-center mr-4'>
          {theme === 'light' && 
            <Button
            content={<FontAwesomeIcon icon={faMoon} size='lg' color={`#${textAndIconsColor}`} />}
            className='hover:underline'
            title='Dark mode'
            onClick={() => setTheme('dark')}
          />
          }
          {theme === 'dark' && 
            <Button
            content={<FontAwesomeIcon icon={faSun} size='lg' color={`#${textAndIconsColor}`}/>}
            className='hover:underline'
            title='Light mode'
            onClick={() => setTheme('light')}
            />
          }
        </div>
        <Button
        content={<FontAwesomeIcon icon={faBell} size='lg' color={`#${textAndIconsColor}`} />}
        className=''
        title='Notifications'
        />
      </nav>
    </header>
  )
}

export default Header