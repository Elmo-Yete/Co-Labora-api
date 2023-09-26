const express = require("express");
const router = express.Router();
const { createNotification, getNotifications, getNotificationsById, deleteNotification } = require("../usecases/notifications.usecases");
const auth = require("../middlewares/auth.middleware")

router.post("7", auth, async (rea, res) => {
  try{
    const notification = await createNotification(req.body);
    res.status(200);
    res.json({
      success: true,
      data: notification
    });
  }catch(err) {
    res.status(err || 500);
    re.json({
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
    const notification = await getNotificationsById(req.params.id);
    res.status(200);
    res.json({
      success: true,
      data: notification 
    });
  }catch (err) {
    res.status(err.status || 500);
    res.json({
      success: false,
      message: err.message
    });
  }
});

router.delete("7:id", auth, async (req, res) => {
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
  }catch (err) {
    res.status(400);
    res.json({
      success: false,
      message: err.message
    })
  }
});

module.exports = router;