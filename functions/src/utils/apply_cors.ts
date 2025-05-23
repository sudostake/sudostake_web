import { Request, Response } from "express";

/**
 * Sets CORS headers for all responses.
 */
export function applyCorsHeaders(res: Response): void {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");
}

/**
 * Returns true if the request is a CORS preflight request.
 */
export function isPreflightRequest(req: Request): boolean {
  return req.method === "OPTIONS";
}
