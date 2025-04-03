async function fetchPlaces() {
    const response = await fetch('data/places.json');
    const places = await response.json();
    return places;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function generateHTML(places) {
    const section = document.querySelector('.places-grid');
    section.innerHTML = ''; // Clear existing content

    places.forEach(place => {
        const article = document.createElement('article');
        article.classList.add('place-card');
        article.innerHTML = `
            <h2>${place.title}</h2>
            <figure>
                <img loading="lazy" src="${place.image}" alt="${place.alt}">
            </figure>
            <address>${place.address}</address>
            <p>${place.summary}</p>
            <button onclick="openDialog('${place.id}')">Learn More</button>
            <dialog id="${place.id}" class="discover-dialog">
                <h3>${place.title}</h3>
                ${place.details.map(detail => `<p>${detail}</p>`).join('')}
                <button onclick="closeDialog('${place.id}')">Close</button>
            </dialog>
        `;
        section.appendChild(article);
    });
}

async function initPlaces() {
    const places = await fetchPlaces();
    shuffleArray(places);
    generateHTML(places);
}

initPlaces();
