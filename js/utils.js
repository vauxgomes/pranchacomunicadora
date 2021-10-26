function randomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function isBright(color) {
    const hex = color.replace("#", "");

    const c_r = parseInt(hex.substr(0, 2), 16);
    const c_g = parseInt(hex.substr(2, 2), 16);
    const c_b = parseInt(hex.substr(4, 2), 16);
    const brightness = (c_r * 299 + c_g * 587 + c_b * 114) / 1000;

    return brightness > 155;
}

function sortBlocks(blocks) {
	console.log(blocks)
    return blocks.sort((a, b) => {
        if (a.order > b.order) return 1;
        else if (a.order < b.order) return -1;
        else if (a.name < b.name) return 1;
        else if (a.name > b.name) return -1;
        return a.id < b.id ? 1 : -1;
    });
}
