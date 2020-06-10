const getNotifier = (notifications, setNotifications) => ({
  notify: (notification) => {
    const filteredNotifications = notifications.filter(
      ({ type: notificationType, id: notificationId }) => notification.id !== notificationId
    )

    if (!notification) {
      return setNotifications(filteredNotifications)
    }

    return setNotifications([notification].concat(filteredNotifications))
  },
  deleteNotifications: (notificationId) => {
    const filteredNotifications = notifications.filter(
      ({ id }) => id !== notificationId
    )

    return setNotifications(filteredNotifications)
  }
})

export default getNotifier
