import express from "express";
import bodyParser from "body-parser";
import WebSocket from "ws";
import { State } from "./types/Lunares";

const app = express();
app.use(bodyParser.json());
const PORT = 8080;

const wss = new WebSocket.Server({ port: 8079 });

const state: State = {
  eva: {}
};

app.get("/state", (req, res) => res.send(state));

app.post("/state", (req, res) => {
  const eva = req.body;
  // TODO validate the payload first
  state.eva = eva;
  
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(state.eva))
    }
  })
  res.end();
});

wss.on("connection", ws => {
  console.log("client connected, sending EVA state");
  ws.send(JSON.stringify(state.eva));
});

app.listen(PORT, () => console.log(`LunAres map server running at port ${PORT}`));
