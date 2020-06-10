import getNotifier from '../notifications'
import { beforeEach, describe, expect, test, jest } from '@jest/globals'

let notifications
let notification
let setNotifications
let notifier

const createNotifier = (notifications, setNotifications) => {
  return getNotifier(notifications, setNotifications)
}

beforeEach(() => {
  setNotifications = jest.fn()
})

describe('notify()', () => {
  describe('when the notifications are empty and the notification is null', () => {
    test('it calls the setNotification function with an empty array', () => {
      notifier = createNotifier([], setNotifications)

      notifier.notify(null)
      expect(setNotifications).toHaveBeenCalledWith([])
    })
  })

  describe('when the notifications are empty and the notification is not null', () => {
    beforeEach(() => {
      notification = {
        type: 'FOO',
        id: '42'
      }

      notifier = createNotifier([], setNotifications)
    })

    test('it calls the setNotification function with an array containing the notification', () => {
      notifier.notify(notification)
      expect(setNotifications).toHaveBeenCalledWith([notification])
    })
  })

  describe('when there is a notification with the same id and the notification is not null', () => {
    beforeEach(() => {
      notification = {
        type: 'FOO',
        id: '42'
      }

      notifications = [notification]

      notifier = createNotifier([], setNotifications)
    })

    test('it calls the setNotification function with an array containing the new notification', () => {
      notifier.notify(notification)

      expect(setNotifications).toHaveBeenCalledWith(notifications)
    })
  })

  describe('when there is a notification with a different id and the notification is not null', () => {
    beforeEach(() => {
      notification = {
        type: 'FOO',
        id: '42'
      }

      notifications = [{
        type: 'FOO',
        id: '43'
      }]

      notifier = createNotifier(notifications, setNotifications)
    })

    test('it calls the setNotification function with an array containing the previous and the new notification', () => {
      notifier.notify(notification)
      expect(setNotifications).toHaveBeenCalledWith([notification].concat(notifications))
    })
  })
})

describe('deleteNotifications()', () => {
  describe('when the notifications are empty', () => {
    test('it calls the setNotifications function with an empty array', () => {
      notifier = createNotifier([], setNotifications)

      notifier.deleteNotifications('42')
      expect(setNotifications).toHaveBeenCalledWith([])
    })
  })

  describe('when there are notifications with a different id from the one provided', () => {
    beforeEach(() => {
      notifications = [
        {
          type: 'FOO',
          id: '43'
        },
        {
          type: 'BAR',
          id: '43'
        }
      ]

      notifier = createNotifier(notifications, setNotifications)
    })

    test('it calls the setNotifications with the existing notifications', () => {
      notifier.deleteNotifications('42')
      expect(setNotifications).toHaveBeenCalledWith(notifications)
    })
  })

  describe('when there are notifications with some having the same id as the one provided', () => {
    beforeEach(() => {
      notifications = [
        {
          type: 'FOO',
          id: '43'
        },
        {
          type: 'BAR',
          id: '43'
        },
        {
          type: 'FOO',
          id: '42'
        },
        {
          type: 'BAR',
          id: '42'
        }
      ]

      notifier = createNotifier(notifications, setNotifications)
    })

    test('it calls the setNotifications with the notifications that have a different id from the one provided', () => {
      notifier.deleteNotifications('42')
      expect(setNotifications).toHaveBeenCalledWith([
        {
          type: 'FOO',
          id: '43'
        },
        {
          type: 'BAR',
          id: '43'
        }
      ])
    })
  })
})
