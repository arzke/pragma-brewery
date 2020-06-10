import React, { useState } from 'react'
import Notification from './Notification'

const getLabel = (numberOfNotifications) => {
  const containersLabel = numberOfNotifications === 1 ? 'container has' : 'containers have'
  return `⚠ ${numberOfNotifications} ${containersLabel} an alert`
}

const Notifications = ({ notifications }) => {
  const [isNotificationPanelOpen, setNotificationPanelOpen] = useState(false)
  const hasNotifications = notifications.length > 0

  return (
    <div className='notifications'>
      {hasNotifications
        ? <span className='notifications-panel-btn has-notifications' onClick={() => setNotificationPanelOpen(!isNotificationPanelOpen)}>{getLabel(notifications.length)}</span>
        : <span className='notifications-panel-btn no-notification'>✓ All the containers are okay</span>}

      {hasNotifications && isNotificationPanelOpen &&
        <ul className='notifications-list'>
          {notifications.map((notification, index) => (
            <Notification key={`notification-${index}`} type={notification.type} id={notification.id}>
              {(notification) => notification ? <li>{notification}</li> : null}
            </Notification>
          ))}
        </ul>}
    </div>
  )
}

export default Notifications
