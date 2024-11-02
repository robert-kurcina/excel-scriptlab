/**
 * Replaces the 'X' in 'Foo X' or '[Bar X]' with a given value
 * @param {number} lvl to replace the 'X'
 * @returns 
 */
function replaceX(lvl){

}

function createMapping(givenList){
    const elems = givenList.split(",");
    const trimmed = elems.map((elem) => elem.trim());
    const hashMap = {};

    for (var i = 0; i < trimmed.length; i += 3) {
        var traitKey = trimmed[i];
        var setKey = trimmed[i + 1];
        var traitLevel = 1 * trimmed[i + 2];

        if (traitKey == ".") { continue; }
        if (hashMap[traitKey] == undefined) {
            hashMap[traitKey] = { lvl: 0, setList: [] };
        }

        hashMap[traitKey].lvl += traitLevel;
        if (setKey?.length && setKey != "."){ 
            hashMap[traitKey].setList.push(setKey); 
        }
    }

    return hashMap;
}

function buildResult(hashMap){
    var keys = Object.keys(hashMap);
    keys = keys.sort();

    const result = [];
    let lastKey = "";
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var lvl = hashMap[key].lvl;
        let appendDot = ". ";
        let text;

        if (key.indexOf("[") >= 0) {
            appendDot = "";
        }

        if (lvl >= 2) {
            const regex = /X/i;
            text = key.replace(regex, lvl) + appendDot;
        } 
        else {
            const regex = / X/i;
            text = key.replace(regex, "") + appendDot;
        }
        
        result.push(text);
        lastKey = key;
    }

    return result;
}

function buildStitch(result){
    let resultStr = result.join("");
    let index = resultStr.indexOf("[");
    let stitch = "";

    if (index >= 0) {
        const index = resultStr.indexOf("[");
        const last = resultStr.slice(index);
        const sub = resultStr.substr(0, index - 1);

        stitch = last + ". " + sub;
    }

    return stitch;
}

/**
 * Calculates the Trait levels
 * @param {string} namePlusLevelArr text string with a series of pairs; string, num, string, num, ..
 * @returns The volume of the sphere.
 */
function traitAndLevels(namePlusLevelArr) {
    const hashMap = createMapping(namePlusLevelArr);
    const result = buildResult(hashMap);
    const stiched = buildStitch(result);

    return stiched;
}

export { traitAndLevels }