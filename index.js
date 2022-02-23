// import packages
const express = require("express");
const ejsLayouts = require("express-ejs-layouts");
const fs = require("fs");
const methodOverride = require("method-override");
const router = express.Router()
module.exports = router

// create an instance of express
const app = express();

// middleware
// tell express to use ejs as the view engine
app.set("view engine", "ejs");
// tell express the we're using ejs layouts
app.use(ejsLayouts);
// method ovveride configuration
app.use(methodOverride("_method"));
// body-parser middleware
// this allows us to access form data via req.body
app.use(express.urlencoded({ extended: false }));

app.use('/dinosaurs', require('./controllers/dinosaurs.js'))
app.use('/prehistoric_creatures', require('./controllers/prehistoric_creatures.js'))


// ROUTES
// home
app.get("/", (req, res) => {
  res.send("Hello Dinos");
});
// index ie list all the dinos!
// app.get("/dinosaurs", (req, res) => {
//   //pull in dinosaurs from the dinosaurs.json
//   let dinosaurs = fs.readFileSync("./dinosaurs.json");
//   let dinoData = JSON.parse(dinosaurs);
//   let nameFilter = req.query.nameFilter;

//   // if there Is a query,
//   if (nameFilter) {
//     dinoData = dinoData.filter((dino) => {
//       return dino.name.toLowerCase() === nameFilter.toLowerCase();
//     });
//   }

//   res.render("index.ejs", { myDinos: dinoData });
// });
// new route (renders the form)
// app.get("/dinosaurs/new", (req, res) => {
//   res.render("new.ejs");
// });
// edit form route (renders edit form)
// app.get("/dinosaurs/edit/:idx", (req, res) => {
//   // read in the dinos from the database
//   let dinosaurs = fs.readFileSync("./dinosaurs.json");
//   let dinoData = JSON.parse(dinosaurs);
//   // extract the dino corresponding to idx paramater
//   let dinoIndex = req.params.idx;
//   let targetDino = dinoData[dinoIndex];
//   // snatch the dino to be updated
//   res.render("edit.ejs", { dino: targetDino, dinoId: dinoIndex });
// });

// PUT ROUTE
// app.put("/dinosaurs/:idx", (req, res) => {
//   // read in the dinos from the database
//   let dinosaurs = fs.readFileSync("./dinosaurs.json");
//   let dinoData = JSON.parse(dinosaurs);
//   //   replace dino fields with field from form
//   dinoData[req.params.idx].name = req.body.name;
//   dinoData[req.params.idx].type = req.body.type;
//   //   write the updated array back to the json file
//   fs.writeFileSync("./dinosaurs.json", JSON.stringify(dinoData));
//   // once the dinosaur has been editted, do a get request to the index route
//   res.redirect("/dinosaurs");
// });

// show ie show all info about a single dino
// app.get("/dinosaurs/:idx", (req, res) => {
//   // read in the dinos from the database
//   let dinosaurs = fs.readFileSync("./dinosaurs.json");
//   let dinoData = JSON.parse(dinosaurs);
//   // extract the dino corresponding to idx paramater
//   let dinoIndex = req.params.idx;
//   let targetDino = dinoData[dinoIndex];
//   res.render("show.ejs", { dino: targetDino });
// });
// post a new dino
// app.post("/dinosaurs", (req, res) => {
//   // read in our dino data from the json file
//   let dinosaurs = fs.readFileSync("./dinosaurs.json");
//   let dinoData = JSON.parse(dinosaurs); // un-jsons it
//   // add the new dino to the dinoData array
//   dinoData.push(req.body);
//   // save the dinosaurs to the json file
//   fs.writeFileSync("./dinosaurs.json", JSON.stringify(dinoData));
//   // redirect back to the index route
//   // res.redirect takes the url pattern for the get route that you want to run next
//   res.redirect("/dinosaurs");
// });

// app.get("/prehistoric_creatures", (req, res) => {
//   let prehistoricCreatures = fs.readFileSync("./prehistoric_creatures.json");
//   let prehistoricData = JSON.parse(prehistoricCreatures);
//   res.render("prehistoricCreatures.ejs", { myPrehistoric: prehistoricData });
// });

// app.get("/prehistoric_creatures/new", (req, res) => {
//   res.render("newPrehistoric.ejs");
// });
// app.get("/prehistoric_creatures/:idx", (req, res) => {
//   let prehistoricCreatures = fs.readFileSync("./prehistoric_creatures.json");
//   let prehistoricData = JSON.parse(prehistoricCreatures);

//   let prehistoricIndex = req.params.idx;
//   let targetPrehistoric = prehistoricData[prehistoricIndex];
//   res.render("showprehistoric.ejs", { prehistoric: targetPrehistoric });
// });

// app.post("/prehistoric_creatures", (req, res) => {
//   let prehistoricCreatures = fs.readFileSync("./prehistoric_creatures.json");
//   let prehistoricData = JSON.parse(prehistoricCreatures);
//   prehistoricData.push(req.body);
//   fs.writeFileSync(
//     "./prehistoric_creatures.json",
//     JSON.stringify(prehistoricData)
//   );
//   res.redirect("/prehistoric_creatures");
// });

// app.delete("/dinosaurs/:idx", (req, res) => {
//   // read in our dinos from our json file
//   let dinosaurs = fs.readFileSync("./dinosaurs.json");
//   let dinoData = JSON.parse(dinosaurs);
//   // remove the delete dino from dinoData
//   dinoData.splice(req.params.idx, 1);
//   // write the updated array back to the json file
//   fs.writeFileSync("./dinosaurs.json", JSON.stringify(dinoData));
//   res.redirect("/dinosaurs");
// });

app.listen(8000, () => {
  console.log("DINO CRUD TIME");
});
