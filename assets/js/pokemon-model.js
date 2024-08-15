class Pokemon {
    constructor(number, name, type, types = [], photo) {
        this.number = number;
        this.name = name;
        this.type = type;
        this.types = types;
        this.photo = photo;
    }

    // Método para exibir informações do Pokémon
    getInfo() {
        return `#${this.number} - ${this.name}`;
    }

    // Método para verificar se o Pokémon é do tipo fornecido
    isType(type) {
        return this.types.includes(type);
    }
}
