const app = require("express")();

const port = 7979;
app.listen(port, () => {
  console.log("[Backend] Started listening on port " + port);
});

app.use("/assets", require("./routes/assets.js"));
app.use("/content", require("./routes/content.js"));
app.use("/fortnite", require("./routes/fortnite.js"));