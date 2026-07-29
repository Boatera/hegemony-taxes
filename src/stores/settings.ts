import { defineStore, storeToRefs } from 'pinia';
import { useStorage } from '@vueuse/core';
import { supportedLocales } from '@/translation';

const defaultLanguage = (function () {
    const browserLocales = navigator.languages || [navigator.language];

    for (const locale of browserLocales) {
        const base = locale.split('-')[0];
        if (supportedLocales.includes(base.toLocaleLowerCase())) {
            return base;
        }
    }

    return 'en';
})();

export const useSettingsStore = defineStore('settings', () => {
    const language = useStorage('settings.language', defaultLanguage);
    const showFormula = useStorage('settings.showFormula', false);
    const setImfPolicies = useStorage('settings.officialImf', true);

    function $reset(full = false) {
        showFormula.value = false;
        if (full) setImfPolicies.value = true;
        if (full) language.value = 'en';
    }

    return {
        language,
        showFormula,
        setImfPolicies,
        $reset,
    };
});

export const getSettingsStore = () => {
    const store = useSettingsStore();
    return { store, ...storeToRefs(store) };
};