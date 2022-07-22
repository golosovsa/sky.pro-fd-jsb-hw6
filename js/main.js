beersContainer = document.querySelector(".beer__container");

let beerObjects = undefined;

function documentLoad() {
    load().then(beers => {
        beers.forEach(data => {
            const newBeerNode = templateEngine(fillBeerCardTemplate(data));
            newBeerNode.addEventListener("click", beerClickHandler)
            newBeerNode.querySelector(".beer__img")
                .addEventListener("load", beerLoadHandler)
            beersContainer.appendChild(newBeerNode);
        })
        beerObjects = beers;
    })
}

document.addEventListener("DOMContentLoaded", documentLoad, {once: true})

let beerClicked = false;

function beerClickHandler(event) {
    if (beerClicked) return;
    

    const id = Number(event.currentTarget.dataset.id);
    let theBeer = undefined;
    for (beer of beerObjects) {
        if (id === beer.id) {
            theBeer = beer;
            break;
        }
    }

    if (theBeer === undefined) {
        return;
    }

    beerClicked = true;

    beerInfoNode = templateEngine(fillBeerInfoTemplate(theBeer));
    beerInfoNode.addEventListener("click", beerCloseHandler)
    document.body.appendChild(beerInfoNode);
}

function beerCloseHandler() {
    beerClicked = false;
    beerInfoNode.remove();
    beerInfoNode = undefined;
}

function beerLoadHandler(event) {
    const card = event.currentTarget.parentElement.parentElement;
    const loader = card.querySelector(".loader");
    const content = card.querySelector(".beer__content");
    loader.classList.add("loader_disable");
    content.classList.remove("beer__content_hidden");
}