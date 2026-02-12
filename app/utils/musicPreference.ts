import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveMusicPreference(enabled: boolean) {
    try {
        await AsyncStorage.setItem('music_enabled', JSON.stringify(enabled));
    } catch (e) {
        console.log('FAILED TO SAVE MUSIC PREFERENCE', e);
    }
}

export async function loadMusicPreference(): Promise<boolean> {
    try {
        const value = await AsyncStorage.getItem('music_enabled');
        return value ? JSON.parse(value) : true;
    } catch (e) {
        console.log('FAILED TO LOAD MUSIC PREFERENCE', e);
        return true;
    }
}