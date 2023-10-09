const Favorite = require("../models/favorites.model");
const { getUserById } = require("./user.usecase");

const createFavorite = async (data) => {
  const user = await getUserById(data.userId);
  const favorite = await Favorite.create(data);
  user.favorites.push(favorite);
  user.save()
  return favorite;
};

const getFavorites = async () => {
  const favorites = await Favorite.find();
  return favorites;
};

const getFavoritesById = async (id) => {
  const favorite = await Favorite.findById(id);
  return favorite;
};

const deleteFavorite = async (id) => {
  const favorite = await Favorite.findByIdAndDelete(id)
  return favorite;
};

module.exports = { createFavorite, getFavorites, getFavoritesById, deleteFavorite };
