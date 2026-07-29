<script setup lang="ts">
import { computed } from 'vue';
import NumberSlider from '@/components/NumberSlider.vue';
import Tooltip from '@/components/Tooltip.vue';
import { getPolicyStore } from '@/stores/policies';
import { getClassStore } from '@/stores/classes';
import { getSettingsStore } from '@/stores/settings';

const { showFormula } = getSettingsStore();
const { incomeTax, imfRelevant } = getPolicyStore();
const { population } = getClassStore();

const wIncomeTax = computed(() => incomeTax.value * population.value);
</script>

<template>
    <div class="working-class card">
        <h3>{{ $t('header.workingclass') }}</h3>
        <div class="split">
            <Tooltip :text="$t('hint.worker.incomeTax')">
                <div class="parameter-icon icon-workers" />
            </Tooltip>
            <div>
                <NumberSlider :min="3" :max="10" v-model:value="population" />
            </div>
        </div>

        <TaxFormula class="no-select">
            <div class="detailed-content">
                <div class="label-group no-break">
                    <div class="label-group-content">
                        {{ population }} &times;
                        <span :class="{ 'pr-1 indicator-warn': imfRelevant }">{{ incomeTax }}</span>
                        <vardis />
                        &equals; {{ wIncomeTax }}
                        <vardis />
                    </div>
                    <div class="label-group-label">{{ $t('taxes.income') }}</div>
                </div>

                <span class="formula-separator">&rArr;&nbsp;</span>
            </div>

            <span class="formula-result">
                <span :class="{ 'indicator-warn': !showFormula && imfRelevant }">
                    {{ wIncomeTax }}
                    <vardis />
                </span>
            </span>
        </TaxFormula>
    </div>
</template>

<style lang="scss">
.working-class {
    container-type: inline-size;
    background-color: var(--c-class-worker);
    color: var(--c-white);
    text-shadow: var(--c-app-bg) 0 0 1px;

    .working-class-logo {
        padding: 0 0.5em 0 0;
        text-align: center;
    }
}
</style>
