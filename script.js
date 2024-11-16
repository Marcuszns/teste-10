// Inicializar o mapa centrado em Vitória da Conquista
var map = L.map('map').setView([-14.8606, -40.8382], 12); // Coordenadas de Vitória da Conquista

// Adicionar a camada de mapa base do OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Dados dos pontos de coleta (corrigido as coordenadas com vírgula extra)
const pontosColeta = [
    { tipo: "plastic", coords: [-14.8420111, -40.9250037], descricao: "Aterro sanitario- Rod. BA 262, km 08" },
    { tipo: "eletronic", coords: [-14.8711074, -40.8300021], descricao: "Ecoponto - Rua São Luis, Candeias" },
    { tipo: "eletronic", coords: [-14.8630441, -40.8493186], descricao: "Ecoponto- Av. Panamá, Bairro Jurema" },
    { tipo: "eletronic", coords: [-14.859683, -40.8311178], descricao: "Sacramentinas" },  // Corrigido
    { tipo: "eletronic", coords: [-14.8634653, -40.8268127], descricao: "Nova escola" }, // Corrigido
    { tipo: "eletronic", coords: [-14.8552997, -40.8278263], descricao: "Maria Salome" },
    { tipo: "eletronic", coords: [-14.8537179, -40.8196868], descricao: "Uniftc" },
    { tipo: "eletronic", coords: [-14.8418607, -40.8772958], descricao: "IFBA" },
    { tipo: "eletronic", coords: [-14.9124939, -40.8756943], descricao: "PRF" },
    { tipo: "eletronic", coords: [-14.8618569, -40.8481497], descricao: "DISEP" },
    { tipo: "eletronic", coords: [-14.8548981, -40.8463117], descricao: "Tecnoagil" },
    { tipo: "eletronic", coords: [-14.8717784, -40.8510153], descricao: "Toyota Diamantina" },
    { tipo: "eletronic", coords: [-14.8713889, -40.8518276], descricao: "Movel" },
    { tipo: "eletronic", coords: [-14.8716667, -40.8501609], descricao: "Cambui" },
    { tipo: "eletronic", coords: [-14.8747877, -40.8520536], descricao: "Topvel" },
    { tipo: "eletronic", coords: [-14.8548654, -40.8451236], descricao: "Hospital São Vicente" },
    { tipo: "eletronic", coords: [-14.8547964, -40.828221], descricao: "Vittasaude" },
    { tipo: "eletronic", coords: [-14.8590064, -40.835156], descricao: "ICON" },
    { tipo: "metal e plasticos", coords: [-14.8332234, -40.9286766], descricao: "Reciclagem Expedito" },
    { tipo: "todos", coords: [-14.8449161, -40.8875394], descricao: "Tigres Reciclagem" },
    { tipo: "metal", coords: [-14.8464078, -40.8861076], descricao: "Sucata LTDA" },
    { tipo: "metal", coords: [-14.8470369, -40.8800998], descricao: "Sucata Prescom" },
    { tipo: "metal e plástico", coords: [-14.8492863, -40.8790219], descricao: "Ecologia Reciclagem" },
    { tipo: "metal", coords: [-14.8594554, -40.8761442], descricao: "Sucatas Metálicas" },
    { tipo: "metal e plástico", coords: [-14.8585755, -40.8591145], descricao: "Conquista Reciclagem" },
    { tipo: "plástico", coords: [-14.8561548, -40.8559995], descricao: "Ze do Vidro" },
    { tipo: "todos", coords: [-14.8438928, -40.8478172], descricao: "Sucata Sol" },
    { tipo: "metal", coords: [-14.8449657, -40.88686], descricao: "Sucata esperanca" },
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

    const descricao = document.getElementById("descricao").value.trim();
    const tipo = document.getElementById("tipo").value;
    const latitude = parseFloat(document.getElementById("latitude").value);
    const longitude = parseFloat(document.getElementById("longitude").value);

    const feedback = document.getElementById("feedbackMessage");

    if (!descricao || !tipo || isNaN(latitude) || isNaN(longitude) ||
        latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
        feedback.textContent = "Erro ao cadastrar. Verifique os dados e tente novamente.";
        feedback.style.display = "block";
        feedback.classList.remove('success');
        feedback.classList.add('error');
        return;
    }

    pontosColeta.push({ tipo, coords: [latitude, longitude], descricao });
    L.marker([latitude, longitude]).addTo(map)
        .bindPopup(`<b>${descricao}</b><br>Tipo: ${tipo}`);

    feedback.textContent = "Ponto de Coleta cadastrado com sucesso!";
    feedback.style.display = "block";
    feedback.classList.remove('error');
    feedback.classList.add('success');

    map.setView([latitude, longitude], 14);

    setTimeout(() => feedback.style.display = "none", 5000);

    document.getElementById("formCadastro").reset();
});
