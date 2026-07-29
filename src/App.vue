<script setup lang="ts">
import PolicySlider from '@/components/PolicySlider.vue';
import WorkerClass from '@/components/WorkerClass.vue';
import MiddleClass from '@/components/MiddleClass.vue';
import CapitalistClass from '@/components/CapitalistClass.vue';
import StateClass from '@/components/StateClass.vue';
import SettingsBar from '@/components/SettingsBar.vue';
import TaxMultiplier from './components/TaxMultiplier.vue';
import { getSettingsStore } from '@/stores/settings';
import { computed } from 'vue';

const { language } = getSettingsStore();
const classes = computed(() => ({ ['lang-' + (language.value ?? 'en')]: true }));
</script>

<template>
    <div :class="classes">
        <div class="container floating-multiplier">
            <div class="column policy-wrapper">
                <TaxMultiplier />
                <PolicySlider policy="fiscal" />
                <PolicySlider policy="labor" />
                <PolicySlider policy="tax" />
                <PolicySlider policy="health" />
                <PolicySlider policy="education" />
            </div>
            <div class="column class-wrapper">
                <WorkerClass />
                <MiddleClass />
                <CapitalistClass />
                <StateClass />
            </div>
        </div>
        <SettingsBar />
    </div>
</template>