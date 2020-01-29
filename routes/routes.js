app.use(express.static(path.join(__dirname, "client/build")));

app.get("/api/getJobDescription", function(req, res) {
  console.log("Something", db.getName());
  res.json(db.getName());
});
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});
