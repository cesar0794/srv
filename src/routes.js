import { Router } from "express";
import SessionController from "./controllers/SessionController.js";
import UserController from "./controllers/UserController";
import auth from "./middlewares/auth.js";
import ImobiController from "./controllers/ImobiController.js";
import multer from "multer";
import uploadConfig from "./middlewares/upload.js";

const upload = multer(uploadConfig);

const router = Router();

router.post("/createusers", UserController.createUser);
router.get("/listusers", auth, UserController.findAllUser);
router.post("/session", SessionController.createSession);
router.post(
  "/createimobi",
  upload.single("thumb"),
  ImobiController.createImobi,
);
router.get("/listimobi", ImobiController.findAllImobi);
router.get("/listimobi/:slug", ImobiController.findImobi);

export { router };
