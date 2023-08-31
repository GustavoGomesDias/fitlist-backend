export const isInvalidField = (field: unknown) => (field as string).trim() === '' || field === null || field === undefined;

export function isEmptyObject(obj: object) {
    for (const property in obj) {
        if (obj.hasOwnProperty(property)) {
            return false;
        }
    }
    return true;
}

export const isEmptyList = (list: Array<any>) => list.length <= 0;

export const isObject = (obj: unknown) => typeof obj === 'object' && obj !== null && !Array.isArray(obj);

export const isValidObject = (obj: Record<any, any>) => {
    const keys = Object.keys(obj);

    for (const key of keys) {
        if (isObject(obj[key]) && isEmptyObject(obj[key])) {
            return false;
        }

        if (isInvalidField(obj[key])) {
            return false;
        }

        if (Array.isArray(obj[key]) && isEmptyList(obj[key])) {
            return false;
        }
    }

    return true;
};