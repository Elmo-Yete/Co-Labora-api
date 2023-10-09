const express = require("express");
const router = express.Router();
const { createNotification, getNotifications, getNotificationsById, deleteNotification } = require("../usecases/notifications.usecases");
const auth = require("../middlewares/auth.middleware")

router.post("/", auth, async (req, res) => {
  try{
    const notification = await createNotification(req.body);
    res.status(201);
    res.json({
      success: true,
      data: notification
    });
  }catch(err) {
    res.status(err || 500);
    res.json({
      success: false,
      message: err.message
    });
  }
});

router.get("/", auth, async(req, res) =>{
  try{
    const notifications = await getNotifications();
    res.status(200);
    res.json({
      success: true,
      data: notifications
    });
  } catch(err){
    res.status(err.status || 500);
    res.json({
      success: false,
      message: err.message
    });
  }
});

router.get("/:id", auth, async (req, res) => {
  try{
    const id = req.params.id;
    let notification = null;
    let response = {}
    if(id.length === 24){
       notification = await getNotificationsById(req.params.id);
       response = {
         status: 200,
         message: "Notification has been found",
         data: notification,
         success: true
       }
    }
    if(!notification){
      response.status = 404;
      response.message = "Notification not found";
      response.data = {};
      response.success = false;

    }
    res.status(response.status);
    res.json({
      success: response.success,
      data: response.data 
    });
  }catch (err) {
    res.status(err.status || 500);
    res.json({
      success: false,
      message: err.message
    });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try{
    const notification = await deleteNotification(req.params.id);
    let response = {
      status: 200,
      message: "Notification has been deleted"
    }
    if(!notification){
      response.status = 404;
      response.message = "Notification not found";
    }
    res.status(response.status);
    res.json({
      success: response.success,
      message: response.message
    });
  }catch (err) {
    res.status(400);
    res.json({
      success: false,
      message: err.message
    })
  }
});

module.exports = router;