const express = require("express");
const router = express.Router();
const fs = require("fs");
module.exports = router;

router.get("/", (req, res) => {
  let prehistoricCreatures = fs.readFileSync("./prehistoric_creatures.json");
  let prehistoricData = JSON.parse(prehistoricCreatures);
  res.render("./prehistoric/prehistoricCreatures.ejs", {
    myPrehistoric: prehistoricData,
  });
});

router.get("/new", (req, res) => {
  res.render("./prehistoric/newPrehistoric.ejs");
});

router.get("/edit/:idx", (req, res) => {
  let prehistoricCreatures = fs.readFileSync("./prehistoric_creatures.json");
  let prehistoricData = JSON.parse(prehistoricCreatures);

  let prehistoricIndex = req.params.idx;
  let targetPrehistoric = prehistoricData[prehistoricIndex];
  res.render("./prehistoric/editPrehistoric.ejs", {
    prehistoric: targetPrehistoric,
    prehistoricId: prehistoricIndex,
  });
});

router.put("/:idx", (req, res) => {
  let prehistoricCreatures = fs.readFileSync("./prehistoric_creatures.json");
  let prehistoricData = JSON.parse(prehistoricCreatures);
  prehistoricData[req.params.idx].name = req.body.name;
  prehistoricData[req.params.idx].img_url = req.body.img_url;

  fs.writeFileSync(
    "./prehistoric_creatures.json",
    JSON.stringify(prehistoricData)
  );

  res.redirect("/prehistoric_creatures");
});

router.get("/:idx", (req, res) => {
  let prehistoricCreatures = fs.readFileSync("./prehistoric_creatures.json");
  let prehistoricData = JSON.parse(prehistoricCreatures);

  let prehistoricIndex = req.params.idx;
  let targetPrehistoric = prehistoricData[prehistoricIndex];
  res.render("./prehistoric/showprehistoric.ejs", {
    prehistoric: targetPrehistoric,
  });
});

router.post("/", (req, res) => {
  let prehistoricCreatures = fs.readFileSync("./prehistoric_creatures.json");
  let prehistoricData = JSON.parse(prehistoricCreatures);
  prehistoricData.push(req.body);
  fs.writeFileSync(
    "./prehistoric_creatures.json",
    JSON.stringify(prehistoricData)
  );
  res.redirect("/prehistoric_creatures");
});

router.delete("/:idx", (req, res) => {
  let prehistoricCreatures = fs.readFileSync("./prehistoric_creatures.json");
  let prehistoricData = JSON.parse(prehistoricCreatures);

  prehistoricData.splice(req.params.idx, 1);

  fs.writeFileSync(
    "./prehistoric_creatures.json",
    JSON.stringify(prehistoricData)
  );
  res.redirect("/prehistoric_creatures");
});
