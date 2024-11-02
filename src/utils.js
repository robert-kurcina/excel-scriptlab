/**
 * Calculates the Trait levels
 * @customfunction
 * @param {string} a text string with a series of pairs; string, num, string, num, ..
 * @returns The volume of the sphere.
 */
function traitAndLevels(namePlusLevelArr) {
    const elems = namePlusLevelArr.split(",");
    const trimmed = elems.map((elem) => elem.trim());
    const hm = {};

    for (var i = 0; i < trimmed.length; i += 3) {
        var traitKey = trimmed[i];
        var setKey = trimmed[i + 1];
        var traitLevel = 1 * trimmed[i + 2];

        if (traitKey == ".") { continue; }
        if (hm[traitKey] == undefined) {
            hm[traitKey] = traitLevel;
        } else {
            hm[traitKey] += traitLevel;
        }
    }

    var keys = Object.keys(hm);
    keys = keys.sort();

    const result = [];
    let lastKey = "";
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var lvl = hm[key];
        let appendDot = ". ";

        if (key.indexOf("[") >= 0) {
            appendDot = "";
        }

        if (lvl >= 2) {
            const regex = /X/i;
            let text = key.replace(regex, lvl) + appendDot;
            result.push(text);
        } else {
            const regex = / X/i;
            let text = key.replace(regex, "") + appendDot;
            result.push(text);
        }

        lastKey = key;
    }

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

export { traitAndLevels }