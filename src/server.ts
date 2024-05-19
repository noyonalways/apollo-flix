import http from "http";
import config from "./config";
import app from "./app";
const server = http.createServer(app);

server.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port}`);
});
