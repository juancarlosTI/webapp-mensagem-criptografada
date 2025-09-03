import NodeRSA from 'node-rsa';

// Receber a classe user por injeção de dependencia
export class CriptografyService {
    constructor(userRep) {
        this.userRepository = userRep;
    }

    async assinarTexto(loggedUser, priv_pem) {
        // Requer chave privada

        const user = await this.userRepository.findById(loggedUser);

        if (!user) {
            throw new Error("Usuário não encontrado");
        }

        if (!user.privKey || user.privKey !== priv_pem) {
            throw new Error("Chave privada não corresponde ao usuário logado");
        }



        const mensagemEncriptada = priv_pem.encrypt(inputParaEncriptar, 'base64');
        console.log(mensagemEncriptada);

        return mensagemEncriptada;
    }

    async gerarChaves() {
        // Registra chaves em nome de um usuário
        console.log('Req chega aqui');
        const key = new NodeRSA({ b: 2048 });
        let publicKeyString = key.exportKey('public');
        let privateKeyString = key.exportKey('private');

        
        return {'chave_publica': publicKeyString, 'chave_privada': privateKeyString }
    }
}