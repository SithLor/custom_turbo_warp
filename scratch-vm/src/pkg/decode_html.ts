//based of npm decode-html
const entities = new Map([
    ['amp', '&'],
    ['apos', '\''],
    ['lt', '<'],
    ['gt', '>'],
    ['quot', '"'],
    ['nbsp', '\xa0']
]);

const entityPattern = /&([a-z]+);/ig;

function decodeHTMLEntities(text) {
    return text.replace(entityPattern, (match, entity) => {
        const decoded = entities.get(entity.toLowerCase());
        return decoded !== undefined ? decoded : match;
    });
}

export default decodeHTMLEntities;