//Create a map
const map = L.map('mapid').setView([-15.801785, -48.067594], 13);

//Create and add tilelayer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// Create icon
const icon = L.icon({
    iconUrl: "./public/images/map-marker.svg",
    iconSize: [58, 68],
    iconAnchor: [29, 68],
})

// Create and add marker
let marker;
//L.marker([-15.801785, -48.067594], { icon }).addTo(map)
map.on('click', (event) => {

    const lat = event.latlng.lat;
    const lng = event.latlng.lng;

    document.querySelector('[name=lat]').value = lat;
    document.querySelector('[name=lng]').value = lng;

    marker && map.removeLayer(marker)

    marker = L.marker([lat, lng], { icon }).addTo(map)
})

//Add photos/uploads
function addPhotoField() {
    //pegar container de fotos #images
    const container = document.querySelector('#images')
        //pegar o container para duplicar .new-images
    const fieldsContainer = document.querySelectorAll('.new-upload')
        //realizar o clone da última imagem adicionada
    const newFieldContainer = fieldsContainer[fieldsContainer.length - 1].cloneNode(true)
        //Verificar campo antes
    const input = newFieldContainer.children[0]

    if (input.value == "") {
        return
    }
    //Limpeza par o proximo campo
    input.value = ""
        //Add o clone ao container de images
    container.appendChild(newFieldContainer)

}

function deleteField(event) {
    const span = event.currentTarget

    const fieldsContainer = document.querySelectorAll('.new-upload')

    if (fieldsContainer.length < 2) {
        //limpar o valor do campo
        span.parentNode.children[0].value = ""
        return
    }

    //deletar o campo
    span.parentNode.remove()
}

// trocar do sim e nao

function toggleSelect(event) {
    //retirar a classe .active dos botões
    document.querySelectorAll('.button-select button')
        .forEach(function(button) {
            button.classList.remove('active')
        })

    //colocar a class .active nesse botão clicado
    const button = event.currentTarget
    button.classList.add('active')

    // atualizar o meu input hidden  com o valor selecionado
    const input = document.querySelector('[name=open_on_weekends]')
    input.value = button.dataset.value
}