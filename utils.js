function cloneObject(obj) {
    let clone = {};

    for (let i in obj) {
        if (obj.hasOwnProperty(i)) {
            if (obj[i] && typeof(obj[i]) === 'object') {
                clone[i] = cloneObject(obj[i]);
            } else {
                clone[i] = obj[i];
            }
        }
    }

    return clone;
}

module.exports = {
    cloneObject: cloneObject
};
