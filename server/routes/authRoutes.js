import express from "express"
import { registerUser, loginUser} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";


const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)   
router.get("/test", protect, (req, res) => {
  res.json({ message: "Protected route accessed" });
});

export default router;