import * as SecureStore from 'expo-secure-store';

async function setToken(key, value) {
    await SecureStore.setItemAsync(key, value);
}

async function getToken(key) {
    const token = await SecureStore.getItemAsync(key);
    return token;
}

async function deleteValue(key) {
    await SecureStore.deleteItemAsync(key);
}

module.exports = {
    setToken,
    getToken,
    deleteValue
}