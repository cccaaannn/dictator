import { ContentDisplayType } from "@/types/content-display-type";
import { Locale } from "@/types/locale";
import { PaletteMode } from "@mui/material";

const SettingsStorageKey = "DICTATOR_SETTINGS";

export interface Settings {
    locale: Locale;
    contentDisplayType: ContentDisplayType;
    paletteMode: PaletteMode
}

const loadSettings = (): Settings | null => {
    const loadedSettings: string | null = localStorage.getItem(SettingsStorageKey);

    console.debug("[Settings] Setting loading", loadedSettings);

    if (!loadedSettings) return null;

    const parsedSettings: Settings = JSON.parse(loadedSettings);

    if (!parsedSettings) return null;

    return parsedSettings;
}

const saveSettings = (settings: Settings): void => {
    console.debug("[Settings] Setting saving", settings);
    localStorage.setItem(SettingsStorageKey, JSON.stringify(settings));
}

const SettingsUtils = {
    loadSettings,
    saveSettings
}

export default SettingsUtils;
