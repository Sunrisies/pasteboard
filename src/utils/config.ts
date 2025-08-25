import { writeTextFile, BaseDirectory, exists, create, readTextFile, mkdir } from '@tauri-apps/plugin-fs';


const CONFIG_PATH = '.pasteboard/config.json';
const CONFIG_DIR = '.pasteboard';

const loadConfig = async (baseDir: BaseDirectory) => {
    const existsConfig = await exists(CONFIG_PATH, { baseDir });
    if (!existsConfig) {
        throw new Error('Config file does not exist');
    }
    const configToml = await readTextFile(CONFIG_PATH, { baseDir });
    return JSON.parse(configToml);
};

export const saveConfig = async (config: any, baseDir: BaseDirectory = BaseDirectory.Home) => {
    const contents = JSON.stringify(config);
    console.log('Config:', contents, CONFIG_PATH, baseDir);
    await writeTextFile(CONFIG_PATH, contents, { baseDir });
};

const ensureConfigDir = async (baseDir: BaseDirectory) => {
    const configDirPath = `${baseDir}/${CONFIG_DIR}`;
    const existsDir = await exists(configDirPath);
    if (!existsDir) {
        await mkdir(configDirPath, { baseDir });
    }
};

const createInitialConfig = async (baseDir: BaseDirectory) => {
    // 检查当前文件夹是否存在
    const existsDir = await exists(CONFIG_DIR, { baseDir });
    if (!existsDir) await mkdir(CONFIG_DIR, { baseDir });
    const file = await create(CONFIG_PATH, { baseDir });
    const contents = JSON.stringify({
        images: [], config: {
            setting: {
                uploadApi: 'https://api.chaoyang1024.top/api/storage',
                path: baseDir
            }
        }
    });
    await file.write(new TextEncoder().encode(contents));
    await file.close();
};

const updateImage = async (image: any, baseDir: BaseDirectory) => {
    try {
        const config = await loadConfig(baseDir);
        const newImage = { ...image, id: config.images.length + 1 };
        config.images = [...config.images, newImage];
        console.log('New image:', newImage, config);
        await saveConfig(config, baseDir);
        console.log('Config updated successfully');
    } catch (error) {
        console.error('Failed to update image:', error);
    }
};

export const configs = async (image: any) => {
    const home = BaseDirectory.Home;
    await updateImage(image, home);
};
export const initConfig = async () => {
    const home = BaseDirectory.Home;
    // 检查当前文件是否存在
    const existsConfig = await exists(CONFIG_PATH, { baseDir: home });
    console.log('existsConfig', existsConfig);
    if (!existsConfig) await createInitialConfig(home);
}

export const getConfig = async () => {
    const home = BaseDirectory.Home;
    const config = await loadConfig(home);
    return config;
}
