export const formatPrice = (price) => {
    var priceStr = price + '';
    var parts = priceStr.split(priceStr.indexOf('.') >= 0 ? '.' : ',');
    var major = `${parts[0]}р.`;
    if (parts.length === 1) {
        parts[1] = 0;
    }

    return `${major} ${parts[1] < 10 ? parts[1] + '0' : parts[1]}к.`;
}

export const getCropUrl = (url, width, height) => {
    return `${url}?anchor=center&mode=crop&width=${width}&height=${height || width}`;
}