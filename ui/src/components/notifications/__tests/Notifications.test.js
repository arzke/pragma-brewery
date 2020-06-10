import React from 'react'
import { beforeEach, expect, jest, describe, test } from '@jest/globals'
import { shallow } from 'enzyme'
import Notifications from '../Notifications'
import Notification from '../Notification'

jest.mock('@apollo/react-hooks')

let notifications

describe('when notifications is an empty array', () => {
  beforeEach(() => {
    notifications = shallow(<Notifications notifications={[]} />)
  })

  test('it displays a message saying all the containers are okay', () => {
    expect(notifications).toContainMatchingElement('.no-notification')
    expect(notifications.find('.no-notification')).toHaveText('✓ All the containers are okay')
  })

  test('there is no notifications list', () => {
    expect(notifications.find('.notifications-list')).toHaveLength(0)
  })
})

describe('when there is 1 notification and the notification panel is closed', () => {
  beforeEach(() => {
    notifications = shallow(
      <Notifications notifications={[
        {
          type: 'FOO',
          id: '42'
        }
      ]}
      />
    )
  })

  test('it displays a message saying that one container has an alert', () => {
    expect(notifications).toContainMatchingElement('.has-notifications')
    expect(notifications.find('.has-notifications')).toHaveText('⚠ 1 container has an alert')
  })

  test('there is no notifications list', () => {
    expect(notifications.find('.notifications-list')).toHaveLength(0)
  })
})

describe('when there are 2 notifications and the notification panel is closed', () => {
  beforeEach(() => {
    notifications = shallow(
      <Notifications notifications={[
        {
          type: 'FOO',
          id: '42'
        },
        {
          type: 'FOO',
          id: '43'
        }
      ]}
      />
    )
  })

  test('it displays a message saying that two containers have an alert', () => {
    expect(notifications).toContainMatchingElement('.has-notifications')
    expect(notifications.find('.has-notifications')).toHaveText('⚠ 2 containers have an alert')
  })

  test('there is no notifications list', () => {
    expect(notifications.find('.notifications-list')).toHaveLength(0)
  })
})

describe('when there are 2 notifications and the notification panel is open', () => {
  beforeEach(() => {
    notifications = shallow(
      <Notifications notifications={[
        {
          type: 'FOO',
          id: '42'
        },
        {
          type: 'FOO',
          id: '43'
        }
      ]}
      />
    )

    notifications.find('.notifications-panel-btn').simulate('click')
  })

  test('notifications are displayed in the list', () => {
    expect(notifications).toContainMatchingElement('.notifications-list')

    const notificationsInList = notifications.find('Notification')

    expect(notificationsInList).toHaveLength(2)
    expect(notificationsInList.at(0).contains(<Notification type='FOO' id='42'>{jest.fn()}</Notification>)).toBe(true)
    expect(notificationsInList.at(1).contains(<Notification type='FOO' id='43'>{jest.fn()}</Notification>)).toBe(true)
  })
})
