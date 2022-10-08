const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
  res.render("index");
});


// router.get("/addNewBook", (req, res) => {
//   res.render("newBook");
// });

module.exports =router;
