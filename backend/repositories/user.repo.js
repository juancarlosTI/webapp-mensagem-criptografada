

export class UserRepository {
  constructor(){
    this.something = 'alright'
  }
  
  async findById(id) {
    // consulta ao banco
    return { id, name: "Juan", active: true };
  }
}

