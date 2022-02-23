const express = require("express");
const router = express.Router();
const fs = require("fs");
module.exports = router;

router.get("/", (req, res) => {
  //pull in dinosaurs from the dinosaurs.json
  let dinosaurs = fs.readFileSync("./dinosaurs.json");
  let dinoData = JSON.parse(dinosaurs);
  let nameFilter = req.query.nameFilter;

  // if there Is a query,
  if (nameFilter) {
    dinoData = dinoData.filter((dino) => {
      return dino.name.toLowerCase() === nameFilter.toLowerCase();
    });
  }
  // console.log(dinoData)
  res.render("./dinos/index.ejs", { myDinos: dinoData });
});

router.get("/new", (req, res) => {
  res.render("./dinos/new.ejs");
});

router.get("/edit/:idx", (req, res) => {
  // read in the dinos from the database
  let dinosaurs = fs.readFileSync("./dinosaurs.json");
  let dinoData = JSON.parse(dinosaurs);
  // extract the dino corresponding to idx paramater
  let dinoIndex = req.params.idx;
  let targetDino = dinoData[dinoIndex];
  // snatch the dino to be updated
  res.render("./dinos/edit.ejs", { dino: targetDino, dinoId: dinoIndex });
});

router.put("/:idx", (req, res) => {
  // read in the dinos from the database
  let dinosaurs = fs.readFileSync("./dinosaurs.json");
  let dinoData = JSON.parse(dinosaurs);
  //   replace dino fields with field from form
  dinoData[req.params.idx].name = req.body.name;
  dinoData[req.params.idx].type = req.body.type;
  //   write the updated array back to the json file
  fs.writeFileSync("./dinosaurs.json", JSON.stringify(dinoData));
  // once the dinosaur has been editted, do a get request to the index route
  res.redirect("/dinosaurs");
});

router.get("/:idx", (req, res) => {
  // read in the dinos from the database
  let dinosaurs = fs.readFileSync("./dinosaurs.json");
  let dinoData = JSON.parse(dinosaurs);
  // extract the dino corresponding to idx paramater
  let dinoIndex = req.params.idx;
  let targetDino = dinoData[dinoIndex];
  res.render("./dinos/show.ejs", { dino: targetDino });
});

router.post("/", (req, res) => {
  // read in our dino data from the json file
  let dinosaurs = fs.readFileSync("./dinosaurs.json");
  let dinoData = JSON.parse(dinosaurs); // un-jsons it
  // add the new dino to the dinoData array
  dinoData.push(req.body);
  // save the dinosaurs to the json file
  fs.writeFileSync("./dinosaurs.json", JSON.stringify(dinoData));
  // redirect back to the index route
  // res.redirect takes the url pattern for the get route that you want to run next
  res.redirect("dinosaurs");
});

router.delete("/:idx", (req, res) => {
  // read in our dinos from our json file
  let dinosaurs = fs.readFileSync("./dinosaurs.json");
  let dinoData = JSON.parse(dinosaurs);
  // remove the delete dino from dinoData
  dinoData.splice(req.params.idx, 1);
  // write the updated array back to the json file
  fs.writeFileSync("./dinosaurs.json", JSON.stringify(dinoData));
  res.redirect("/dinosaurs");
});
