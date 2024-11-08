let map;
const motoboys = {}; // Armazenar motoboys ativos
const socket = new WebSocket('ws://localhost:3000'); // Certifique-se de que a porta esteja correta

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -23.5505, lng: -46.6333 }, // Centro de São Paulo
        zoom: 12,
    });

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        updateMotoboyLocation(data.id, data.latitude, data.longitude);
    };
}

function updateMotoboyLocation(id, latitude, longitude) {
    if (!motoboys[id]) {
        motoboys[id] = new google.maps.Marker({
            position: { lat: latitude, lng: longitude },
            map: map,
            title: `Motoboy ${id}`,
        });
    } else {
        motoboys[id].setPosition({ lat: latitude, lng: longitude });
    }
}

if (navigator.geolocation) {
    navigator.geolocation.watchPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude
        fetch('/api/motoboys/localizacao', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ latitude, longitude }),
        });
    });
}

function logout() {
    localStorage.removeItem('token');
    window.location.href = '/login.html'; // Redireciona para a página de login
}

// Inicializa o mapa quando a página carregar
window.onload = initMap;
