<script setup lang="ts">
import { getPolicyStore } from '@/stores/policies';
import { getSettingsStore } from '@/stores/settings';
const { store, taxMultiplier, imfActive } = getPolicyStore();
const { setImfPolicies } = getSettingsStore();
</script>

<template>
    <div class="tax-multiplier">
        <div class="tax-multiplier-card card split no-select">
            <div class="parameter-icon icon-tax-multiplier" />

            <div class="tax-multiplier-container">
                <div class="tax-multiplier-label">{{ taxMultiplier }}</div>
            </div>

            <div class="pointer" :class="{ 'indicator-warn': imfActive }" @click="() => store.$imf(setImfPolicies)">
                <div class="parameter-icon icon-imf" :class="{ 'inverted-50': !imfActive, inverted: imfActive }" />
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@use '@/assets/styles/breakpoints' as bp;

.tax-multiplier-card {
    color: var(--c-white);
    background-color: var(--c-surface-multiplier);
    text-shadow: var(--c-app-bg) 0 0 1px;
    transition: 0.2s ease-in-out;
    padding: 0.5em;
    grid-template-columns: 3em 1fr 2.25em;

    @include bp.between('md', 'lg') {
        grid-template-columns: 2.5em 1fr 2.25em;
        padding-left: 0.6em;
    }

    @include bp.below('md') {
        padding: 0.3em 0.5em;
    }
}

.tax-multiplier-container {
    text-align: center;

    .tax-multiplier-label {
        display: inline-block;
        background-color: var(--c-white);
        color: var(--c-black);

        padding: auto;
        line-height: 1.8em;
        height: 1.8em;
        width: 2.2em;

        font-size: 1.1rem;
        font-weight: bold;
        border: 2px var(--c-black) solid;
        border-radius: 1.5em;
        box-shadow: 0 0 1em var(--c-app-bg);

        @include bp.below('lg') {
            line-height: 1.75em;
            height: 1.75em;
        }

        @include bp.below('md') {
            line-height: 1.6em;
            height: 1.6em;
        }
    }
}
</style>
