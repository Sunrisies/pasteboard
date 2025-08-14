import { load, type Store } from '@tauri-apps/plugin-store';

export const loadStore = async (): Promise<Store> => {
    return await load('store.json', { autoSave: false });

    // console.log(await store.get('token'), '=====')
}