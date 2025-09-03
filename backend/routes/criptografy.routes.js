//import CriptografyService from "../services/criptografy.service";
import { Router } from "express";
import { UserRepository } from "../repositories/user.repo.js";
import { CriptografyService } from "../services/criptografy.service.js";
import { prisma } from '../prisma/prisma.js';

const router = Router()

router.get("/createKeys",async(req,res) => {
    try {

        const userRepo = new UserRepository(prisma);
        const criptoService = new CriptografyService(userRepo);

        console.log("req.user.id: ",req.user.id)

        const findUser = await userRepo.findById(req.user.id);

        // Verificar sessão
        console.log("findUser: ",findUser);


        const chaves = await criptoService.gerarChaves();
        // Chamar persistencia
        console.log('Chaves: ', chaves);

        const saveKeys = await userRepo.saveKeys(findUser.id,chaves);

        if (!saveKeys){
            return "sem chaves"
        }

        return res.status(201).json({"userid":findUser.id,"priv_pem": chaves.chave_privada,"pub_pem": chaves.chave_publica});
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