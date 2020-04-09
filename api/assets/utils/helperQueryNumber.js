function helperQueryNumber(value, defaultValue) {
    if (value && !isNaN(value)) return parseInt(value);
    return defaultValue;
}

module.exports = helperQueryNumber;