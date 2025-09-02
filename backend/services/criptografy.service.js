
// Receber a classe user por injeção de dependencia
export class CriptografyService {
    constructor(userRep) {
        this.userRepository = userRep;
    }

    assinarTexto(priv_pem) {
        // Requer chave privada
        if (!user || !user.active) {
            throw new Error("Usuário inválido ou inativo");
        }
        let key;
        return key
    }

    gerarChaves() {
        // Registra chaves em nome de um usuário
        return { 'pub': pub_pem, 'priv': priv_pem }
    }
}