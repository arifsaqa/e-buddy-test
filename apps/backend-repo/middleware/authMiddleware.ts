import { RequestHandler } from "express";
import { auth } from "../config/firebaseConfig";

const authMiddleware: RequestHandler = (request, response, next) => {
  const authHeader = request.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (token == null) return response.sendStatus(401);

  auth
    .verifyIdToken(token)
    .then((decodedToken) => {
      if (decodedToken) return next();
      return response.sendStatus(401);
    })
    .catch((err) => {
      return response.sendStatus(401);
    });
};

export default authMiddleware;
