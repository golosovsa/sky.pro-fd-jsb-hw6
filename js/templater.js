const beerCardTemplate = {
    tag: "div",
    classes: ["beer"],
    attrs: {
        "data-id": undefined,
    },
    content: [
        {
            tag: "div",
            classes: ["beer__blur", ],
        },
        {
            tag: "div",
            classes: ["beer__background", ],
            content: [
                {
                    tag: "div",
                    classes: ["loader", ],
                    content: [
                        {
                            tag: "div",
                            classes: ["loader__inside",],
                        },
                    ],
                },
            ],
        },
        {
            tag: "div",
            classes: ["beer__content", "beer__content_hidden"],
            content: [
                {
                    tag: "h2",
                    classes: ["beer__title", ],
                    content: undefined,
                },
                {
                    tag: "img",
                    classes: ["beer__img", ],
                    attrs: {
                        src: undefined, 
                        alt: undefined,
                    },
                },
                {
                    tag: "p",
                    classes: ["beer__tagline", ],
                    content: undefined,
                },
                {
                    tag: "p",
                    classes: ["beer__adv", ],
                    content: undefined,
                },
            ],
        },
    ],
}


const beerInfoTemplate = {
    tag: "div",
    classes: ["info", ],
    content: [
        {
            tag: "div",
            classes: ["loader", "loader_disable"],
            content: [
                {
                    tag: "div",
                    classes: ["loader__inside",],
                },
            ],
        },
        {
            tag: "div",
            classes: ["info__content", ],
            content: [
                {
                    tag: "div",
                    classes: ["info__short", ],
                    content: [
                        {
                            tag: "p",
                            classes: ["info__short-item", ],
                            content: undefined,
                        },
                        {
                            tag: "p",
                            classes: ["info__short-item", ],
                            content: undefined,
                        },
                        {
                            tag: "p",
                            classes: ["info__short-item", ],
                            content: undefined,
                        },
                        {
                            tag: "p",
                            classes: ["info__short-item", ],
                            content: undefined,
                        },
                        {
                            tag: "p",
                            classes: ["info__short-item", ],
                            content: undefined,
                        },
                        {
                            tag: "p",
                            classes: ["info__short-item", ],
                            content: undefined,
                        },
                        {
                            tag: "p",
                            classes: ["info__short-item", ],
                            content: undefined,
                        },
                        {
                            tag: "p",
                            classes: ["info__short-item", ],
                            content: undefined,
                        },
                        {
                            tag: "p",
                            classes: ["info__short-item", ],
                            content: undefined,
                        },
                        {
                            tag: "p",
                            classes: ["info__short-item", ],
                            content: undefined,
                        },
                        {
                            tag: "p",
                            classes: ["info__short-item", ],
                            content: undefined,
                        },
                        {
                            tag: "p",
                            classes: ["info__short-item", ],
                            content: undefined,
                        },
                    ],
                },
                {
                    tag: "img",
                    classes: ["info__img", ],
                    attrs: {
                        src: undefined, 
                        alt: undefined,
                    },
                },
                {
                    tag: "div",
                    classes: ["info__big", ],
                    content: [
                        {
                            tag: "p",
                            classes: ["info__big-item", ],
                            content: undefined,
                        },
                        {
                            tag: "p",
                            classes: ["info__big-item", ],
                            content: undefined,
                        },
                        {
                            tag: "p",
                            classes: ["info__big-item", ],
                            content: undefined,
                        },
                    ],
                },
            ],
        }
    ],
}

function fillBeerCardTemplate(data) {
    const result = structuredClone(beerCardTemplate);
    result.attrs["data-id"] = data.id;
    result.content[2].content[0].content = data.name;
    result.content[2].content[1].attrs.src = data.image_url;
    result.content[2].content[1].attrs.alt = data.name;
    result.content[2].content[2].content = data.tagline;
    result.content[2].content[3].content = data.abv;
    return result;
}

function fillBeerInfoTemplate(data) {
    const result = structuredClone(beerInfoTemplate);

    result.content[1].content[1].attrs.src = data.image_url;
    result.content[1].content[1].attrs.alt = data.name;

    result.content[1].content[0].content[0].content = `Name: ${data.name}`;
    result.content[1].content[0].content[1].content = `tagline: ${data.tagline}`;
    result.content[1].content[0].content[2].content = `first brewed: ${data.first_brewed}`;
    result.content[1].content[0].content[3].content = `abv: ${data.abv}`;
    result.content[1].content[0].content[4].content = `ibu: ${data.ibu}`;
    result.content[1].content[0].content[5].content = `target_fg: ${data.target_fg}`;
    result.content[1].content[0].content[6].content = `target_og: ${data.target_og}`;
    result.content[1].content[0].content[7].content = `ebc: ${data.ebc}`;
    result.content[1].content[0].content[8].content = `srm: ${data.srm}`;
    result.content[1].content[0].content[9].content = `ph: ${data.ph}`;
    result.content[1].content[0].content[10].content = `attenuation level: ${data.attenuation_level}`;
    result.content[1].content[0].content[11].content = `contributed by: ${data.contributed_by}`;

    result.content[1].content[2].content[0].content = `description: ${data.description}`;
    result.content[1].content[2].content[1].content = `brewers tips: ${data.brewers_tips}`;
    result.content[1].content[2].content[2].content = `food_pairing: ${data.food_pairing.join(", ")}`;


    return result;
}

function templateEngine(block) {

    const result = document.createElement(block.tag);

    if (block.classes) {
        result.classList.add(...block.classes);
    }
    
    if (block.attrs) {

        const keys = Object.keys(block.attrs);

        keys.forEach(key => {
            result.setAttribute(key, block.attrs[key]);
        })
    }

    if (block.content) {

        let content = block.content;

        if (!Array.isArray(block.content)) {
            content = [content, ];
        }

        for (item of content) {

            const typeOfItem = typeof item;

            if (typeOfItem === "string" || typeOfItem === "number" || typeOfItem === "boolean") {
                result.appendChild(document.createTextNode(item));
                continue;
            }

            if (item === undefined || item === null) {
                result.appendChild(document.createTextNode(""));
                continue;
            }

            result.appendChild(templateEngine(item));
        }
    }

    return result;
}
