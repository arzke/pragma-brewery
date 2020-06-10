import React, { createContext, useState } from 'react'

const NotificationsContext = createContext(null)

export const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([])

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        setNotifications
      }}
    >

      {children}
    </NotificationsContext.Provider>
  )
}

export default NotificationsContext
