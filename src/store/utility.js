export const updateObject = ( originalObject, updatedObject ) => {
    return {
        ...originalObject,
        ...updatedObject
    }
};