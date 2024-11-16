// Inicializar o mapa centrado em Vitória da Conquista
var map = L.map('map').setView([-14.8606, -40.8382], 12); // Coordenadas de Vitória da Conquista

// Adicionar a camada de mapa base do OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Dados de exemplo dos pontos de coleta
const pontosColeta = [
    { tipo: "plastic", coords: [-14.8420111,-40.9250037], descricao: "Aterro sanitario- Rod. BA 262, km 08" },
    { tipo: "eletronic", coords: [-14.8705438,-40.8307048], descricao: "Ecoponto - Rua São Luis, Candeias" },
    { tipo: "eletronic", coords: [-14.8630441,-40.8493186], descricao: "Ecoponto- Av. Panamá, Bairro Jurema" }
];

// Função para adicionar os pontos de coleta no mapa
function addPontosFiltrados(tipo) {
    pontosColeta.forEach(ponto => {
        if (tipo === "all" || ponto.tipo === tipo) {
            L.marker(ponto.coords).addTo(map)
                .bindPopup(`<b>${ponto.descricao}</b><br>Tipo: ${ponto.tipo}`);
        }
    });
}

// Adicionar todos os pontos inicialmente
addPontosFiltrados("all");

// Filtrar pontos com base na seleção do usuário
document.getElementById("filter-type").addEventListener("change", function() {
    map.eachLayer(function(layer) {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });
    addPontosFiltrados(this.value);
});

// Cadastro de novo ponto de coleta
document.getElementById("formCadastro").addEventListener("submit", function(event) {
    event.preventDefault();

    // Obtém os dados do formulário
    const descricao = document.getElementById("descricao").value;
    const tipo = document.getElementById("tipo").value;
    const latitude = parseFloat(document.getElementById("latitude").value);
    const longitude = parseFloat(document.getElementById("longitude").value);

    // Adiciona o novo ponto de coleta no mapa
    if (descricao && tipo && !isNaN(latitude) && !isNaN(longitude)) {
        pontosColeta.push({ tipo, coords: [latitude, longitude], descricao });
        
        // Atualiza o mapa com os novos pontos
        L.marker([latitude, longitude]).addTo(map)
            .bindPopup(`<b>${descricao}</b><br>Tipo: ${tipo}`);

        // Exibe a mensagem de sucesso
        var feedback = document.getElementById("feedbackMessage");
        feedback.textContent = "Ponto de Coleta cadastrado com sucesso!";
        feedback.style.display = "block";
        feedback.classList.remove('error');
        feedback.classList.add('success');
    } else {
        // Exibe a mensagem de erro
        var feedback = document.getElementById("feedbackMessage");
        feedback.textContent = "Erro ao cadastrar. Verifique os dados e tente novamente.";
        feedback.style.display = "block";
        feedback.classList.remove('success');
        feedback.classList.add('error');
    }
});
