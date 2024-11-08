class MinhaClasse {
    constructor() {
        window.addEventListener("keydown", this.downListener);
        window.addEventListener("keyup", this.upListener);
    }

    downListener(event) {
        console.log("Tecla pressionada:", event.key);
    }

    upListener(event) {
        console.log("Tecla solta:", event.key);
    }
}

// Exemplo de uso
const instancia = new MinhaClasse();
