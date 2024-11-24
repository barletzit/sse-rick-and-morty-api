// server.ts
import express from "express";
import cors from "cors";
import { SseCharactersHandler } from "./sse-handlers";

const PORT = process.env.PORT || 3000;
const localClientUrl = process.env.LOCAL_CLIENT_ULR || "http://localhost:5173";

const corsOptions = {
  origin: localClientUrl,
  methods: "GET,POST",
};

const app = express();
app.use(cors(corsOptions));

app.get("/api/characters/fetch", SseCharactersHandler);

app.listen(PORT, () => {
  console.log("server is running on port 3000");
});
