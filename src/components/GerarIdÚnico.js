function GerarIdÚnico() {
    let dataHora = Date.now().toString();
    let numeroAleatório = Math.floor(Math.random() * 100).toString();
    return dataHora + numeroAleatório;
}

export default GerarIdÚnico