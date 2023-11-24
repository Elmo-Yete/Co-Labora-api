const express = require("express");
const router = express.Router();
const { createComment, getComments, deleteComment } = require("../usecases/comments.usecases");
const auth = require("../middlewares/auth.middleware")

router.post("/", auth, async (req, res) => {
  try{
    const comment = await createComment(req.body);
    res.status(201);
    res.json({
      success: true,
      data: comment
    });
  } catch( err ) {
    res.status(err.status || 500);
    res.json({
      success: false,
      data: err.message
    })
  }
})
router.get("/", auth, async (req, res) => {
  try {
    const comment = await getComments();
    res.status(201);
    res.json({
      success: true,
      data: comment,
    });
  } catch (err) {
    res.status(err.status || 500);
    res.json({
      success: false,
      message: err.message,
    });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const comment = await deleteComment(req.params.id);
    let response= { 
      status: 200,
      message: "Comment has been delete"
    }
    if(!comment) {
      response.status = 404;
      response.message = "Comment nor found"
    }
    res.status(response.status);
    res.json({
      success: true,
      message: response.message
    });
  } catch (err) {
    res.status(err.status || 500);
    res.json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
