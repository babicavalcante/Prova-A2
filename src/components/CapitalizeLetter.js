function CapitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function ToUpperCase(string) {
    return string.toUpperCase();
}

export { CapitalizeFirstLetter, ToUpperCase }