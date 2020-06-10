import React from 'react'
import NotificationsContext from '../context/NotificationsContext'
import Notifications from './notifications/Notifications'

const Header = () => {
  const { notifications } = React.useContext(NotificationsContext)

  return (
    <header>
      <nav className='navbar' role='navigation' aria-label='main navigation'>
        <div className='navbar-brand'>
          <a className='navbar-item' href='/'>
            Pragma Brewery
          </a>
        </div>
        <Notifications notifications={notifications} />
      </nav>
    </header>
  )
}

export default Header
