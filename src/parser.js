/**
 * Replaces the 'X' in 'Foo X' or '[Bar X]' with a given value
 * @param {number} lvl to replace the 'X'
 * @returns 
 */
function replaceLevel(key, lvl) {
    const regex = /X/;
    let appendDot = ". ";
    let text;

    if (key.indexOf("[") >= 0) {
        appendDot = "";
    }

    if (lvl >= 2) {
        text = key.replace(regex, lvl) + appendDot;
    }
    else {
        text = key.replace(regex, "") + appendDot;
    }

    return text;
}

/**
 * Ensures that the setList entries are unique
 * @param {array} setList
 * @returns array sorted and unique
 */
function ensureUnique(setList) {
    function onlyUnique(value, index, array) {
        return array.indexOf(value) === index;
    }

    const unique = setList.filter(onlyUnique);
    const sorted = setList.sort();

    return sorted;
}

/**
 * Replaces the place-holder text after the angle-bracket match for "Foo > Bar" 
 * with a flattened string built from setList. The setList is delimited with commas
 * and is within curly braces if there are at least two values.
 * @param {string} text 
 * @param {array} setList 
 * @returns string modified text with inserts for any setList entries 
 */
function replaceSetTarget(text, setList) {
    if (setList.length == 0) { return text; }

    const regex = /\> \w+/;
    let result;

    if (setList.length == 1) {
        result = text.replace(regex, `> ${setList}`);
    }
    else {
        const sortUnique = ensureUnique(setList);
        result = text.replace(regex, `> {${sortUnique.join(", ")}}`);
    }

    return result;
}

/**
 * Takes the list of entries, which must be sets of three values being trait
 * name, sub-trait keyword, trait level, and build a hashMap result
 * @param {array} givenList 
 * @returns object hashMap of traits where each key: { lvl: number, setList: [keyword, ..]}
 */
function createMapping(givenList) {
    const elems = givenList.split(",");
    const trimmed = elems.map((elem) => elem.trim());
    const hashMap = {};

    for (var i = 0; i < trimmed.length; i += 3) {
        var traitKey = trimmed[i];
        var setKey = trimmed[i + 1] || "";
        var traitLevel = 1 * trimmed[i + 2];

        if (traitKey == ".") { continue; }
        if (hashMap[traitKey] == undefined) {
            hashMap[traitKey] = { lvl: 0, setList: [] };
        }

        hashMap[traitKey].lvl += traitLevel;
        if (setKey.length && setKey != ".") {
            hashMap[traitKey].setList.push(setKey);
        }
    }

    return hashMap;
}

/**
 * ensure that the hashMap of values provided are deconstructed into an array of traits
 * @param {object} hashMap 
 * @returns array of traits
 */
function buildResult(hashMap) {
    const result = [];
    let lastKey = "";
    var keys = Object.keys(hashMap);
    keys = keys.sort();

    for (var i = 0; i < keys.length; i++) {
        const key = keys[i];
        const lvl = hashMap[key].lvl;
        const setList = hashMap[key].setList;
        const text = replaceLevel(key, lvl);
        const output = replaceSetTarget(text, setList);

        result.push(output);
        lastKey = key;
    }

    return result;
}

/**
 * Joins the trait entries, and ensures that the disability traits which
 * are delimited within square-brackets are at the front of the result string
 * @param {array} entries 
 * @returns string of joined values
 */
function buildStitch(entries) {
    let resultStr = entries.join("");
    let index = resultStr.indexOf("[");
    let stitch = "";

    if (index >= 0) {
        const index = resultStr.indexOf("[");
        const last = resultStr.slice(index);
        const sub = resultStr.substr(0, index - 1);

        stitch = last + ". " + sub;
    }

    return stitch || resultStr;
}

/**
 * Calculates the Trait levels
 * @param {string} namePlusLevelArr text string with a series of pairs; string, num, string, num, ..
 * @returns string of all traits listed in alphabetical order
 */
function traitAndLevels(namePlusLevelArr) {
    const hashMap = createMapping(namePlusLevelArr);
    const result = buildResult(hashMap);
    const stitched = buildStitch(result);

    return stitched;
}

export default traitAndLevels