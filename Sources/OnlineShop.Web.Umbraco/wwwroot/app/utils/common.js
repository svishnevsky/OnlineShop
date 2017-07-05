export const formatPrice = (price) => {
    var parts = (price + '').split('.');
    var major = `${parts[0]}р.`;
    if (parts.length === 1) {
        return major;
    }

    return `${major} ${parts[1]}к.`;
}