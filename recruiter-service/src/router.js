import express from "express";
import {register} from "./controllers/register.js";
import {login} from "./controllers/login.js";
import {registeRecruiter} from "./controllers/registerRecruiter.js";
import {refresh} from "./controllers/refresh.js";
import {getCompany} from "./controllers/getCompany.js";
import {logout} from "./controllers/logout.js";
import {getRecruiter} from "./controllers/getRecruiter.js";
import {getAllCompany} from "./controllers/getAllCompany.js";

const router = express.Router();

router.get("/all-companies", getAllCompany);
router.get("/refresh/:id", refresh);
router.get("/logout/:session_id", logout);
router.get("/company/:id", getCompany);
router.get("/get-recruiter/:id", getRecruiter);
router.post("/register", register);
router.post("/login", login);
router.post("/recruiter", registeRecruiter);

export default router;
