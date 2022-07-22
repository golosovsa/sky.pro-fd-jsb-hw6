const beerURI = "https://api.punkapi.com/v2/beers";

async function load() {
    const response = await fetch(beerURI);
    return await response.json();
}


