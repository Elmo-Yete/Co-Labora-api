const express = require("express");
const router = express.Router();
const { createFavorite, getFavorites, getFavoritesById, deleteFavorite } = require("../usecases/favourites.usecases")
const auth = require("../middlewares/auth.middleware");

router.post("/", auth, async (req, res) => {
 try{
  const favorite = await createFavorite(req.body);
  res.status(201);
  res.json({
    success: true,
    data: favorite
  });
 }catch(err){
  res.status(err || 500);
  res.json({
    success: false,
    message: err.message
  });
 };
});

router.get("/", auth, async (req, res) => {
  try{
    const favorites = await getFavorites();
    res.status(200);
    res.json({
      success: true,
      data: favorites
    });
  }catch(err){
    res.status(err.status || 500)
    res.json({
      success: false,
      message: err.message
    });
  };
});

router.get("/:id", auth, async (req, res) => {
  try{
    const id = req.params.id;
    let favorite = null;
    let response = {};
    if(id.length === 24){
      favorite = await getFavoritesById(id);
      response = {
        status: 200,
        message: "Favorite has been found", 
        data: favorite
      }
    }
    if(!favorite){
      response.status = 401;
      response.message = "Favorite not found";
      response.data = {};
      response.success = false;
    }
    res.status(response.status);
    res.json({
      success: response.success,
      data: response.data
    })
  }catch(err){

  }
})

module.exports = router;