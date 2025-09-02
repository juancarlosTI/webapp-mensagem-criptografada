//import CriptografyService from "../services/criptografy.service";
import { Router } from "express";
import { UserRepository } from "../repositories/user.repo.js";
import { CriptografyService } from "../services/criptografy.service.js";

const router = Router()

router.get("/",(req,res) => {
    try{

        const userRepo = new UserRepository()
        const criptoService = new CriptografyService(userRepo);

        console.log("Iniciou com injeção: ", criptoService);

        // Verificar sessão

        // const generateKey = CriptografyService.gerarChaves();
        let generateKey;
        return criptoService;
        // Chamar service
    }
    catch(err){
        return {"erro":err}
    }
})


export default router;