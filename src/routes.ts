import { Router } from "express";
import { getConnection, getCustomRepository, getRepository } from "typeorm";

import "./database";
import User from "./entities/UserEntity";

const router = Router();

router.get("/", async (req, res) => {});

export default router;
