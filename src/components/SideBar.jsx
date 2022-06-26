import React from 'react'
import Button from './Button' 
import { useSideBarContext } from '../contexts/SideBarContext'
import { useThemeContext } from '../contexts/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDay, faCalendarCheck, faCalendarWeek, faCalendarXmark, faBarsProgress, faStar, faPlus } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const SideBar = () => {
  const body = document.body
  const {
    textAndIconsColor,
    sideBarAndHeaderColor,
    bodyColor
  } = useThemeContext();
  body.style.background = '#' + bodyColor
  const { sideBar } = useSideBarContext();
  const sideBarData = [
    {
      text: `Today's tasks`,
      icon: faCalendarDay,
      link: '/today'
    }, 
    {
      text: `Next 7 days' tasks`,
      icon: faCalendarWeek,
      link: '/next-seven-days'
    },
    {
      text: 'Completed tasks',
      icon: faCalendarCheck,
      link: '/completed-tasks'
    },
    {
      text: 'Missed tasks',
      icon: faCalendarXmark,
      link: '/missed-tasks'
    },
    {
      text: 'Important tasks',
      icon: faStar,
      link: '/important-tasks'
    }, 
    {
      text: 'My progress',
      icon: faBarsProgress,
      link: '/progress'
    }, 
  ]
  return (
     <aside 
    style={{left: !sideBar ? '-100%' : '0', backgroundColor: '#' + sideBarAndHeaderColor }}
    className='h-full z-20 w-56 fixed top-[52px] md:top-[60px] left-0 transition-all duration-200 border-r border-r-slate-100'
    >
     <ul 
     className='list-none flex-col items-start py-2 '
     >
        {sideBarData.map(({text, icon, link}, index) => (
          <Link 
          to={link}
          key={index}
          >
          <li
            className='flex items-center py-4 px-6 hover:bg-[#d1d1d154] w-full'
            onClick={() => document.getElementById('toggleSB').click()}
            >
              <span className='mr-5'><FontAwesomeIcon icon={icon} size='lg' color={`#${textAndIconsColor}`} /></span>
              <p 
              className='hover:underline cursor-pointer hover:text-slate-700 font-medium'
              title={text}
              style={{color: '#' + textAndIconsColor }}
              >
              {text}
              </p>
          </li>
          </Link>
        ))}
        <Link to={'/add-task'}>
          <button
          onClick={() => document.getElementById('toggleSB').click()}
          className='w-full flex items-center justify-center gap-2 py-2 px-4 bg-slate-600 hover:bg-slate-700 text-white'
          >
          <span><FontAwesomeIcon icon={faPlus} /></span>
          <p>New task</p>
          </button>
        </Link>
      </ul>
    </aside>
  )
}

export default SideBar