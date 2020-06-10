import React, { useContext, useEffect } from 'react'
import { describe, expect, jest, test } from '@jest/globals'
import { mount } from 'enzyme'
import NotificationsContext, { NotificationsProvider } from '../NotificationsContext'

jest.mock('@apollo/react-hooks')

const TestComponent = () => {
  const { notifications, setNotifications } = useContext(NotificationsContext)

  useEffect(() => {
    setNotifications([
      {
        type: 'FOO',
        id: '42'
      },
      {
        type: 'BAR',
        id: '42'
      },
      {
        type: 'BAZ',
        id: '42'
      }
    ])
  }, [null])

  return (
    <ul>
      {notifications.map((notification) => (
        <li key={`${notification.id}-${notification.type}`}>{notification.type}</li>
      ))}
    </ul>
  )
}

describe('when a component is wrapped with the NotificationsProvider', () => {
  test('it has access to the notifications in the context', () => {
    const wrapper = mount(
      <NotificationsProvider>
        <TestComponent />
      </NotificationsProvider>
    )

    const notifications = wrapper.find('li')

    expect(notifications).toHaveLength(3)
    expect(notifications.at(0)).toHaveText('FOO')
    expect(notifications.at(1)).toHaveText('BAR')
    expect(notifications.at(2)).toHaveText('BAZ')
  })
})
