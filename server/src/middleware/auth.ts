import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const auth = (req: Request, res: Response, next: NextFunction) => {
    try {
        // Lấy token từ Header hoặc Query Param
        let token: string | undefined;

        if (req.headers.authorization) {
            token = req.headers.authorization.split(" ")[1]; // Bearer <token>
        } else if (req.query.Authorization) {
            token = String(req.query.Authorization);
        }

        if (!token) {
            return res.status(401).json({ success: false, message: "Token missing" });
        }

        jwt.verify(token, process.env.JWT_SECRET!);
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
};
