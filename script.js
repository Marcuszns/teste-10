// Inicializar o mapa centrado em uma coordenada específica
var map = L.map('map').setView([-23.55052, -46.6333], 12); // Coordenadas de São Paulo como exemplo

// Adicionar a camada de mapa base do OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Dados de exemplo dos pontos de coleta
const pontosColeta = [
    { tipo: "plastic", coords: [-23.55652, -46.6353], descricao: "Coleta de Plástico - Av. Paulista" },
    { tipo: "paper", coords: [-23.5500, -46.6347], descricao: "Coleta de Papel - Rua Augusta" },
    { tipo: "glass", coords: [-23.5600, -46.6200], descricao: "Coleta de Vidro - Av. Brigadeiro" },
    { tipo: "metal", coords: [-23.5625, -46.6512], descricao: "Coleta de Metal - Praça da Sé" }
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
