<script lang="ts" setup>
import { computed, ref } from 'vue';
import { getSettingsStore } from '@/stores/settings';
import { useClassStore } from '@/stores/classes';
import { usePolicyStore } from '@/stores/policies';
import ModalComponent from '@/components/ModalComponent.vue';

const { store, language, showFormula, setImfPolicies } = getSettingsStore();

const baseUrl = import.meta.env.BASE_URL;
const isModalOpened = ref(false);

const showQr = () => {
    isModalOpened.value = true;
};
const hideQr = () => {
    isModalOpened.value = false;
};
const toggleImfAutomation = () => {
    setImfPolicies.value = !setImfPolicies.value;
};
const toggleFormula = () => {
    showFormula.value = !showFormula.value;
};

function resetStores() {
    store.$reset();
    usePolicyStore().$reset();
    useClassStore().$reset();
}

const imfIcon = computed(() => ({
    'icon-position-center m-auto w-80 h-100 ': true,
    'icon-automation': setImfPolicies.value,
    'icon-imf-label': !setImfPolicies.value,
}));

const appVersion = `v${__APP_VERSION__}`;
const licenseUrl = `${__APP_REPO__}/blob/main/LICENSE`;
const issuesUrl = `${__APP_REPO__}/issues`;
</script>

<template>
    <div class="card bottom">
        <div class="app-settings">
            <div class="settings-language no-break">
                <img
                    v-for="locale in $i18n.availableLocales"
                    :src="`${baseUrl}/icons/flag-${locale}.svg`"
                    :key="`locale-${locale}`"
                    :class="{ 'language-icon': true, active: $i18n.locale == locale }"
                    @click="() => ($i18n.locale = language = locale)"
                />
            </div>
            <div class="settings-config no-break">
                <div class="pointer settings-icon" @click="toggleImfAutomation">
                    <div :class="imfIcon" />
                </div>
                <div class="pointer settings-icon icon-formula" @click="toggleFormula" />
                <div class="pointer settings-icon icon-reset" @click="resetStores" />
                <div class="pointer settings-icon icon-share" @click="showQr" />
                <ModalComponent :show="isModalOpened" @click="hideQr" @modal-close="hideQr" name="qr-modal">
                    <template #header>Share App</template>
                    <template #content>
                        <div class="share-app"><img src="/icons/qr-code.svg" /></div>
                    </template>
                </ModalComponent>
            </div>
        </div>
        <div class="settings-license no-break">
            &copy; Yvo Niedrich
            <span class="text-separator"> | </span>
            <a :href="issuesUrl" target="_blank">{{ appVersion }}</a>
            <span class="text-separator"> | </span>
            <a :href="licenseUrl" target="_blank">MIT License</a>
        </div>
    </div>
</template>

<style lang="scss">
@use '@/assets/styles/breakpoints' as bp;

.share-app {
    box-shadow: 0 0 10px var(--c-black);

    border: 6px solid var(--c-white);
    border-radius: 0.25em;
    margin: 1.8em auto;

    width: 14em;
    height: 14em;

    > img {
        width: 100%;
        height: 100%;
    }
}

.card.bottom {
    border-color: var(--c-border-dark);
    border-radius: 0.325rem;
    background-color: var(--c-surface-settings);
    margin-top: 0.8em;
    margin-bottom: 0.5em;
    padding: 0;

    display: grid;
    grid-template-columns: 5fr 3fr;

    @include bp.below('md') {
        grid-template-columns: 11fr 7fr;
    }

    @include bp.below('sm') {
        grid-template-columns: 1fr;
    }

    .app-settings {
        display: grid;
        grid-template-columns: 3fr 4fr;

        @include bp.below('md') {
            grid-template-columns: 5fr 9fr;
        }
    }

    .app-settings > div,
    .settings-license {
        padding-top: 0.5em;
        padding-bottom: 0.3em;
        text-align: center;
    }

    .language-icon,
    .settings-icon {
        height: 1.4em;
        margin: 0 0.3em;

        border-radius: 0.325rem;
    }

    .settings-config,
    .settings-license {
        border-color: var(--c-grey-900);
        border-style: solid;
        border-width: 0 0 0 1px;
    }

    .settings-icon {
        display: inline-block;
        width: 2.6em;
        height: 1.4em;

        background-size: 100% 85%;
        background-repeat: no-repeat;
        background-position: center;

        background-color: var(--c-grey-400);
        box-shadow: 0 0 1px var(--c-black);
        transition:
            background-color 0.15s var(--ease),
            transform 0.1s var(--ease);

        &:hover {
            background-color: var(--c-white);
            transform: translateY(-1px);
        }

        &:active {
            transform: translateY(0) scale(0.93);
        }

        .settings-icon .cls-1 {
            fill: var(--c-black);
        }
    }

    .settings-license {
        color: var(--c-grey-500);
        line-height: 2.4em;
        font-size: 0.7em;

        a {
            color: var(--c-grey-500);
            text-decoration: underline;

            &:hover {
                text-decoration: none;
            }
        }

        @include bp.below('sm') {
            border-width: 1px 0 0 0;
        }
    }

    .language-icon {
        opacity: 0.6;
        cursor: pointer;
        transition:
            opacity 0.15s var(--ease),
            transform 0.1s var(--ease);

        &:hover {
            opacity: 0.9;
            transform: translateY(-1px);
        }

        &.active {
            opacity: 1;
            filter: drop-shadow(0px 0px 2px rgb(255 255 255 / 0.3));
        }
    }
}
</style>
