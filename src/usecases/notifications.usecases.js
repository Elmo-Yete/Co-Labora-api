const Notification = require("../models/notifications.model");

const createNotification = async (data) =>{
  const notification = Notification.create(data);
  return notification;
};

const getNotifications = async() => {
  const notifications = await Notification.find();
  return notifications;
};

const  getNotificationsById = async (id) => {
  const notification = await Notification.findById(id);
  return notification;
}

const deleteNotification = async (id) => {
  const deleteNotification = await Notification.findByIdAndDelete(id);
  return deleteNotification;
}

module.exports = { createNotification, getNotifications, getNotificationsById, deleteNotification };