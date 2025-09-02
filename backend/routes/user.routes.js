// import { UserService } from "../services/user.service";
import { Router } from "express";

const router = Router()

router.get("/",(req,res) => {
    try{
        // Verifica user
        const verifyUser = 'service.user find by id'

        const generateKey = "User"

        return generateKey;
        // Chamar service
    }
    catch(err){
        return {"erro":err}
    }
})

export default router