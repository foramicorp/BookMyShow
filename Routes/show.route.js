const Router = require("express");
const isToken = require("../Middleware/auth");
const { addShow, getShow, bookSeats } = require("../Controller/show.controller");

const showRouter = Router();

showRouter.post("/addshow", isToken , addShow);
showRouter.get("/getshow", isToken , getShow);
showRouter.post("/bookshow/:showId" , isToken , bookSeats);

module.exports = showRouter;

