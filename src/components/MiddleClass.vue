<script setup lang="ts">
import { computed } from 'vue';
import Tooltip from '@/components/Tooltip.vue';
import { getPolicyStore } from '@/stores/policies';
import { getClassStore } from '@/stores/classes';
import { getSettingsStore } from '@/stores/settings';

const { showFormula } = getSettingsStore();
const { incomeTax, imfRelevant, taxMultiplier } = getPolicyStore();
const { mEmployments, mBusinesses } = getClassStore();

const mIncomeTax = computed(() => incomeTax.value * mEmployments.value);
const employmentTax = computed(() => taxMultiplier.value * mBusinesses.value);
</script>

<template>
    <div class="middle-class card">
        <h3>{{ $t('header.middleclass') }}</h3>

        <div class="middleclass-parameters">
            <div class="split middleclass-operational">
                <Tooltip :text="$t('hint.middle.employmentTax')">
                    <div class="parameter-icon icon-business-m" />
                </Tooltip>
                <div class="middleclass-parameter parameter-businesses">
                    <NumberInput :min="0" :max="8" v-model.number="mBusinesses" />
                </div>
            </div>

            <div class="split middleclass-labor">
                <Tooltip :text="$t('hint.middle.incomeTax')">
                    <div class="parameter-icon icon-business-c">
                        <div class="parameter-icon icon-business-s"></div>
                    </div>
                </Tooltip>
                <div class="middleclass-parameter parameter-employment">
                    <NumberInput :min="0" :max="24" v-model.number="mEmployments" />
                </div>
            </div>
        </div>

        <TaxFormula class="no-select">
            <div class="detailed-content">
                <div class="label-group no-break">
                    <div class="label-group-content">
                        {{ mEmployments }}&times;
                        <span :class="{ 'pr-1 indicator-warn': imfRelevant }">{{ incomeTax }}</span>
                        <vardis />
                        &equals; {{ mIncomeTax }}
                        <vardis />
                    </div>
                    <div class="label-group-label">{{ $t('taxes.income') }}</div>
                </div>

                <span class="formula-separator">&plus;</span>

                <div class="label-group no-break">
                    <div class="label-group-content">
                        {{ taxMultiplier }}
                        <vardis /> &times; {{ mBusinesses }} &equals; {{ employmentTax }}
                        <vardis />
                    </div>
                    <div class="label-group-label">{{ $t('taxes.employment') }}</div>
                </div>
            </div>
            <span class="detailed-content formula-separator">&rArr;&nbsp;</span>

            <span class="formula-result">
                <span :class="{ 'indicator-warn': !showFormula && imfRelevant }">
                    {{ mIncomeTax + employmentTax }}
                    <vardis />
                </span>
            </span>
        </TaxFormula>
    </div>
</template>

<style lang="scss">
@use '@/assets/styles/breakpoints' as bp;

.middle-class {
    container-type: inline-size;
    background-color: var(--c-class-middle);
    color: var(--c-white);
    text-shadow: var(--c-app-bg) 0 0 1px;

    .middleclass-parameters {
        display: grid;
        grid-template-columns: 1fr 1fr;

        @include bp.below('sm') {
            grid-template-columns: 1fr;
        }
    }

    .icon-business-c {
        background-size: 65%;
        background-position: 10% 5%;
        filter: drop-shadow(0px 0px 1px rgb(255 255 255 / 0.75));
    }

    .icon-business-s {
        background-size: 65%;
        background-position: 90% 95%;
        filter: drop-shadow(0px 0px 1px rgb(255 255 255 / 0.5));
    }

    .icon-business-m {
        background-size: 2.75em;
        filter: drop-shadow(0px 0px 8px rgb(0 0 0 / 0.75));
    }

    .middleclass-parameter {
        margin: 0.5em 10%;

        @include bp.below('sm') {
            margin: 0.5em 2.3em;
        }
    }

    .middleclass-divider {
        background-color: var(--c-divider);
        height: 1px;
        border: 1px solid var(--c-divider-border);
        border-left-width: 0;
        border-right-width: 0;
        margin: 0 2em;
    }

    .middle-class .split {
        margin: 0.8em 0;
    }

    .middle-class-logo {
        padding: 0 0.5em 0 0;
        text-align: center;
    }
}
</style>
