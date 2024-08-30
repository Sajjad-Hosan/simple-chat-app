const express = require("express");
const app = express();
const port = process.env.PORT || 1000;
const http = require("http").createServer(app);

http.listen(port, () => {
  console.log(`The Port is running now ${port}`);
});

app.use(express.static(__dirname, +"/public"));
app.get("/", async (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Socket

const io = require("socket.io")(http);

io.on("connection", (socket) => {
  console.log(`Connected ${''}`);
  socket.on("message", (msg) => {
    // console.log(msg);
    socket.broadcast.emit('message', msg);
  });
});
