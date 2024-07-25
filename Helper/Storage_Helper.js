import AsyncStorage from '@react-native-async-storage/async-storage';

class MyStorageManager {
    constructor(storageKey) {
        this.storageKey = storageKey;
    }

    async loadArray() {
        try {
            const data = await AsyncStorage.getItem(this.storageKey);
            if (data !== null) {
                return JSON.parse(data);
            } else {
                return [];
            }
        } catch (error) {
            console.error('Error loading data from AsyncStorage:', error);
            return [];
        }
    }

    async saveArray(array) {
        try {
            await AsyncStorage.setItem(this.storageKey, JSON.stringify(array));
        } catch (error) {
            console.error('Error saving data to AsyncStorage:', error);
        }
    }

    async addDataToStorage(newItem) {
        const currentArray = await this.loadArray();
        currentArray.push(newItem);
        await this.saveArray(currentArray);
    }
    async removeEverythingFromDb() {
        AsyncStorage.removeItem(this.storageKey);
    }
}

export default MyStorageManager;
