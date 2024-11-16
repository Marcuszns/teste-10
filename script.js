// Inicializar o mapa centrado em Vitória da Conquista
var map = L.map('map').setView([-14.8606, -40.8382], 12); // Coordenadas de Vitória da Conquista

// Adicionar a camada de mapa base do OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Dados dos pontos de coleta
const pontosColeta = [
    { tipo: "plastic", coords: [-14.8420111, -40.9250037], descricao: "Aterro sanitario- Rod. BA 262, km 08" },
        { tipo: "eletronic", coords:[-14.8711074,-40.8300021], descricao: "Ecoponto - Rua São Luis, Candeias" },
    { tipo: "eletronic", coords: [-14.8630441, -40.8493186], descricao: "Ecoponto- Av. Panamá, Bairro Jurema" },
    { tipo: "eletronic", coords: [-14.859801, -40.8355971], descricao: "Sacramentinas" },
    { tipo: "eletronic", coords: [-14.8633135, -40.8295843], descricao: "Nova escola" },
    { tipo: "eletronic", coords: [-14.8553948, -40.8304541], descricao: "Maria Salome" },
    { tipo: "eletronic", coords: [-14.8537179, -40.8241393], descricao: "Uniftc" },
    { tipo: "eletronic", coords: [-14.8418607, -40.8797098], descricao: "IFBA" },
    { tipo: "eletronic", coords: [-14.9124939, -40.8781083], descricao: "PRF" },
    { tipo: "eletronic", coords: [-14.861752, -40.8481126], descricao: "DISEP" },
    { tipo: "eletronic", coords: [-14.8548981, -40.8487257], descricao: "Tecnoagil" },
    { tipo: "eletronic", coords: [-14.8717784, -40.8534293], descricao: "Toyota Diamantina" },
    { tipo: "eletronic", coords: [-14.8713889, -40.8739362], descricao: "Movel" },
    { tipo: "eletronic", coords: [-14.8716667, -40.8546134], descricao: "Cambui" },
    { tipo: "eletronic", coords: [-14.8747877, -40.8544676], descricao: "Topvel" },
    { tipo: "eletronic", coords: [-14.8548654, -40.8495761], descricao: "Hospital São Vicente" },
    { tipo: "eletronic", coords: [-14.8547964, -40.830635], descricao: "Vittasaude" },
    { tipo: "eletronic", coords: [-14.8590064, -40.8349847], descricao: "ICON" }
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
