const isValidArray = data => Array.isArray(data) && data.length > 0;

const useFilterRegex = (targetText, inputText) => {
    let searchPatternStr = '';

    if (inputText) {
        const inputParts = inputText.replace(/([+])/g, '').trim().split(' ');
        const addPattern = term => `(?=.*${term})`;
        if (isValidArray(inputParts))
            inputParts.forEach(item => searchPatternStr += addPattern(item));
        else
            searchPatternStr = addPattern(inputText);
    };

    const regex = new RegExp(`^${searchPatternStr}.*$`, 'i');

    return regex.test(targetText);
}

module.exports = {
    isValidArray,
    useFilterRegex
}
