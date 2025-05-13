import express from "express";
import http from "http";
import { Server as WebSocketServer } from "ws";
import { createWorker, types as mediasoupTypes } from "mediasoup";

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const PORT = 3001;

(async () => {
  const worker = await createWorker();
  const mediaCodecs: mediasoupTypes.RtpCodecCapability[] = [
    {
      kind: "audio",
      mimeType: "audio/opus",
      clockRate: 48000,
      channels: 2,
    },
  ];
  const router = await worker.createRouter({ mediaCodecs });

  console.log("Mediasoup Worker and Router initialized");

  server.listen(PORT, () => {
    console.log(`SFU running on http://localhost:${PORT}`);
  });

  wss.on("connection", (socket) => {
    console.log("Client connected to SFU WebSocket");

    socket.on("message", (msg) => {
      const data = JSON.parse(msg.toString());
      console.log("Received from client:", data);
      // Handle messages like 'createTransport', 'produce', etc.
    });
  });
})();
