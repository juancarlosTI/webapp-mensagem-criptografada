//import CriptografyService from "../services/criptografy.service";
import { Router } from "express";
import { UserRepository } from "../repositories/user.repo.js";
import { CriptografyService } from "../services/criptografy.service.js";

const router = Router()

router.get("/createKeys",(req,res) => {
    try {

        const userRepo = new UserRepository();
        const criptoService = new CriptografyService(userRepo);

        const findUser = userRepo.findById(req.user.id);
        // Verificar sessão
        const chaves = criptoService.gerarChaves(findUser);
        // Chamar persistencia

        if (!chaves){
            return null
        }

        console.log(chaves);

        const saveKeys = userRepo.saveKeys(chaves);

        if (!saveKeys){
            return "sem chaves"
        }

        return saveKeys;
    }

    catch(err){
        return {"erro":err}
    }
})

router.post("/assinarTexto", (req,res) => {
    try {
         
    }
    catch (err) {

    }
})


export default router;