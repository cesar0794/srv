import { Router } from "express";
import SessionController from "./controllers/SessionController.js";
import UserController from "./controllers/UserController";
import auth from "./middlewares/auth.js";

const router = Router();

router.post("/createusers", UserController.createUser);
router.get("/listusers", auth, UserController.findAllUser);
router.post("/session", SessionController.createSession);

export { router };
