<script setup lang="ts">
import { computed } from 'vue';
import { getPolicyStore } from '@/stores/policies';
import { getClassStore } from '@/stores/classes';
import Tooltip from '@/components/Tooltip.vue';

const { tax, taxMultiplier } = getPolicyStore();
const { cBusinesses, cRevenue, cWages, cFoodSold } = getClassStore();

const corporateTaxTable = {
    4: [0, 0, 0],
    9: [1, 2, 2],
    24: [5, 5, 4],
    49: [12, 10, 7],
    99: [24, 15, 10],
    199: [40, 30, 20],
    299: [100, 70, 40],
    99999: [160, 120, 60],
};

function getCorporateTax(income: number, policy: number): number {
    for (const [key, value] of Object.entries(corporateTaxTable)) {
        if (income <= Number(key)) {
            return value[policy] ?? NaN;
        }
    }
    return NaN;
}

const cGrossIncome = computed(() => cRevenue.value - cWages.value + cFoodSold.value);
const employmentTax = computed(() => taxMultiplier.value * cBusinesses.value);
const corporateTax = computed(() => getCorporateTax(cGrossIncome.value - employmentTax.value, tax.value));
</script>

<template>
    <div class="capitalist-class card">
        <h3>{{ $t('header.capitalist') }}</h3>

        <div class="capitalist-parameters">
            <!-- Row 1: Revenue field on top (full width) -->
            <div class="split full-width">
                <Tooltip :text="$t('hint.capitalist.revenue')">
                    <div class="parameter-label">{{ $t('taxes.revenue') }}</div>
                </Tooltip>
                <div class="capitalist-parameter parameter-revenue">
                    <NumberInput :min="0" :max="999" :intervalTimeout="40" v-model.number="cRevenue" />
                </div>
            </div>

            <!-- Row 2: Wages and Food Sold -->
            <div class="split">
                <Tooltip :text="$t('hint.capitalist.wages')">
                    <div class="parameter-label">{{ $t('taxes.wages') }}</div>
                </Tooltip>
                <div class="capitalist-parameter parameter-wages">
                    <NumberInput :min="0" :max="999" :intervalTimeout="40" v-model.number="cWages" />
                </div>
            </div>

            <div class="split">
                <Tooltip :text="$t('hint.capitalist.foodSold')">
                    <div class="parameter-label">{{ $t('taxes.coverNeeds') }}</div>
                </Tooltip>
                <div class="capitalist-parameter parameter-food">
                    <NumberInput :min="0" :max="999" :intervalTimeout="40" v-model.number="cFoodSold" />
                </div>
            </div>

            <!-- Row 3: Gross Income side-by-side with Operational Company at bottom -->
            <div class="split">
                <Tooltip :text="$t('hint.capitalist.corporateTax')">
                    <div class="parameter-label">{{ $t('taxes.grossIncome') }}</div>
                </Tooltip>
                <div class="capitalist-parameter parameter-gross-income">
                    <div class="gross-income-box">
                        {{ cGrossIncome }}
                        <vardis />
                    </div>
                </div>
            </div>

            <div class="split">
                <Tooltip :text="$t('hint.capitalist.employmentTax')">
                    <div class="parameter-icon icon-business-c" />
                </Tooltip>
                <div class="capitalist-parameter parameter-businesses">
                    <NumberInput :min="0" :max="12" v-model.number="cBusinesses" />
                </div>
            </div>
        </div>

        <TaxFormula class="no-select">
            <div class="detailed-content">
                <div class="label-group no-break">
                    <div class="label-group-content">
                        {{ taxMultiplier }}
                        <vardis /> &times; {{ cBusinesses }} &equals; {{ employmentTax }}
                        <vardis />
                    </div>
                    <div class="label-group-label">{{ $t('taxes.employment') }}</div>
                </div>

                <span class="formula-separator">&plus;</span>

                <div class="label-group no-break">
                    <div class="label-group-content" style="min-width: 3.5em">&nbsp;&nbsp;{{ corporateTax }} <vardis />&nbsp;&nbsp;</div>
                    <div class="label-group-label">{{ $t('taxes.corporate') }}</div>
                </div>
            </div>
            <span class="detailed-content formula-separator">&rArr;&nbsp;</span>
            <span class="formula-result">
                {{ employmentTax + corporateTax }}
                <vardis />
            </span>
        </TaxFormula>
    </div>
</template>

<style lang="scss">
@use '@/assets/styles/breakpoints' as bp;

.capitalist-class {
    container-type: inline-size;
    background-color: var(--c-class-capitalist);
    color: var(--c-white);
    text-shadow: var(--c-app-bg) 0 0 1px;

    .capitalist-parameters {
        display: grid;
        grid-template-columns: repeat(2, 1fr);

        .full-width {
            grid-column: 1 / -1;
        }

        @include bp.below('sm') {
            grid-template-columns: 1fr;
        }
    }

    .capitalist-parameter {
        margin: 0.5em 10%;

        @include bp.below('sm') {
            margin: 0.5em 2.3em;
        }
    }

    .full-width .capitalist-parameter {
        margin: 0.5em 5%;

        @include bp.below('sm') {
            margin: 0.5em 2.3em;
        }
    }

    .gross-income-box {
        display: block;
        text-align: center;
        border-radius: 0.4rem;
        border: 1px solid var(--c-grey-800);
        background-color: rgba(255, 255, 255, 0.85);
        color: var(--c-black);
        font-size: 1.25rem;
        font-weight: bold;
        padding: 0.5rem 0;
        line-height: 1.3;
    }

    .icon-business-c {
        background-size: 2.75em;
        filter: drop-shadow(0px 0px 8px rgb(0 0 0 / 0.75));
    }

    .icon-business-s {
        background-size: 2.75em;
        filter: drop-shadow(0px 0px 8px rgb(0 0 0 / 0.75));
    }

    .icon-income {
        background-size: 90%;
    }

    .split .tooltip-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .parameter-label {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        font-size: 0.9rem;
        font-weight: bold;
        text-align: center;
        line-height: 1.1;
    }
}
</style>
