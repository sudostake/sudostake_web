import { Request, Response } from "express";

/**
 * Sets CORS headers for all responses.
 * @param {Response} res - Express response object
 * @return {void}
 */
export function applyCorsHeaders(res: Response): void {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.set("Access-Control-Allow-Headers", "Content-Type");
}

/**
 * Returns true if the request is a CORS preflight request.
 * @param {Request} req - Express request object
 * @return {boolean}
 */
export function isPreflightRequest(req: Request): boolean {
    return req.method === "OPTIONS";
}
