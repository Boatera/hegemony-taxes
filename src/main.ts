import './assets/main.scss';

import App from './App.vue';
import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import { createPinia } from 'pinia';
import { useSettingsStore } from '@/stores/settings';

import { messages } from '@/translation';

import NumberInput from '@/components/NumberInput.vue';
import TaxFormula from '@/components/TaxFormula.vue';
import VardisIcon from '@/components/VardisIcon.vue';

const app = createApp(App);

app.use(createPinia());

const { language } = useSettingsStore();

app.use(
    createI18n({
        locale: language ?? 'en', // set locale
        fallbackLocale: 'en', // set fallback locale
        messages,
    }),
);

app.component(NumberInput.name ?? 'NumberInput', NumberInput);
app.component('TaxFormula', TaxFormula);

// eslint-disable-next-line vue/multi-word-component-names
app.component('vardis', VardisIcon);

app.mount('#app');