
class Utilities {
    static isItemExistInList(itemToCheck, list) {
        const isObjectExists = list.some((singleItem) => {
            return singleItem.ein === itemToCheck.ein;
        });
        return isObjectExists;
    }


}

export default Utilities;
