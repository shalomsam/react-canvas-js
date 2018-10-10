/**
 * @function importAll
 * @param {any} r - Require Context.
 * @returns {string} - File paths.
 */
export const importAll = (r) => {
    return r.keys().map(r);
};

/**
 * @function importAllImages
 * @param {string} directory - The complete directory/folder path.
 * @param {regex} extensions - file extension filter.
 * @returns {string}
 */
export const importAllImages = (directory, extensions = /\.(jpg|jpeg|png|svg)$/) => {
    return importAll(require.context(directory, false, extensions));
};

/**
 * @function hasProperty
 * @param {string} property - The property to check for in the given object.
 * @param {object} object - The object in which to check for above given property.
 * @returns {any}
 */
export const hasProperty = (property, object) => {
    try {
        return (typeof object === 'object') && !Array.isArray(object) && object.hasOwnProperty(property);
    } catch (e) {
        console.warn(e.message, e);
        return false;
    }
};

/**
 * @function isObject
 * @param {object} object - Object to check if is an object.
 * @returns {boolean}
 */
export const isObject = (object) => {
    try {
        return (typeof object === 'object') && !Array.isArray(object);
    } catch (e) {
        console.warn(e.message, e);
        return false;
    }
};
