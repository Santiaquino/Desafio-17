import { Router } from "express";
import controller from "../controller/users.controller.js";

const router = Router();

router.get("/", async (req, res, next) => {
  controller.getAll(req, res, next);
});

router.post("/", async (req, res, next) => {
  controller.createUser(req, res, next);
});

router.put("/:uid/carts/:cid", async (req, res, next) => {
  controller.updates(req, res, next);
});

router.put("/premium/:uid", async (req, res, next) => {
  controller.changeRole(req, res, next);
});

export default router;
