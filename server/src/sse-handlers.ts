import { Request, Response } from "express";
import { SyncEvent } from "../../shared/types";
import { processData } from "./sse-process-data";

const sseHelper = (res: Response): ((data: SyncEvent) => void) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const sendEvent = (data: SyncEvent) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  return sendEvent;
};

export const SseCharactersHandler = async (_: Request, res: Response) => {
  const sendEvent = sseHelper(res);

  try {
    await processData("character", sendEvent);
  } catch (error) {
    console.error(error);
    throw new Error(`HTTP error! status: ${error}`);
  } finally {
    res.end();
  }
};
