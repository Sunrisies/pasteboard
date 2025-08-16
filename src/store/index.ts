import { load, type Store } from '@tauri-apps/plugin-store';
import { configureStore } from '@reduxjs/toolkit'
import configSlice from './config';
export const loadStore = async (): Promise<Store> => {
    return await load('store.json', { autoSave: false });
}


export default configureStore({
    reducer: {
        counter: configSlice
    },
})