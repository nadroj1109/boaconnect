export function getNestedValue(object, path, fallback = undefined) {

    if (!path) {

        return object;

    }

    return path
        .split(".")
        .reduce(
            (value, key) => value?.[key],
            object
        ) ?? fallback;

}

export function setNestedValue(object, path, value) {

    const clone = structuredClone(object);

    const keys = path.split(".");

    let current = clone;

    keys.forEach((key, index) => {

        if (index === keys.length - 1) {

            current[key] = value;

            return;

        }

        if (
            current[key] === undefined ||
            current[key] === null
        ) {

            current[key] = {};

        }

        current = current[key];

    });

    return clone;

}

export function deleteNestedValue(object, path) {

    const clone = structuredClone(object);

    const keys = path.split(".");

    let current = clone;

    while (keys.length > 1) {

        current = current[keys.shift()];

    }

    delete current[keys[0]];

    return clone;

}

export function fillNestedValues(object, values) {

    let clone = structuredClone(object);

    Object.entries(values).forEach(([path, value]) => {

        clone = setNestedValue(

            clone,

            path,

            value

        );

    });

    return clone;

}