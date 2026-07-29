<script setup lang="ts">
import { computed } from 'vue';
import { getPolicyStore } from '@/stores/policies';
import { getClassStore } from '@/stores/classes';
import Tooltip from '@/components/Tooltip.vue';
import { getCorporateTax } from '@/utils/taxes';

const { fiscal, tax, taxMultiplier, incomeTax } = getPolicyStore();
const {
    sTreasury,
    sWages,
    sLoans,
    population,
    mBusinesses,
    mEmployments,
    cBusinesses,
    cRevenue,
    cWages,
    cFoodSold,
} = getClassStore();

// 1. Treasury after Wages & Loans
const netTreasury = computed(() => sTreasury.value - sWages.value);
const deficit = computed(() => (netTreasury.value < 0 ? Math.abs(netTreasury.value) : 0));
const neededLoans = computed(() => (deficit.value > 0 ? Math.ceil(deficit.value / 50) : 0));
const totalLoans = computed(() => sLoans.value + neededLoans.value);
const treasuryAfterWages = computed(() => netTreasury.value + neededLoans.value * 50);

// 2. IMF Check
const fiscalLetter = computed(() => ['A', 'B', 'C'][fiscal.value] ?? 'A');
const imfAlertTriggered = computed(() => {
    if (fiscal.value === 2) {
        return totalLoans.value >= 1;
    } else {
        return totalLoans.value >= 2;
    }
});

// 3. Tax calculations for all classes
const workerTax = computed(() => incomeTax.value * population.value);

const mIncomeTax = computed(() => incomeTax.value * mEmployments.value);
const mEmploymentTax = computed(() => taxMultiplier.value * mBusinesses.value);
const middleTax = computed(() => mIncomeTax.value + mEmploymentTax.value);

const cGrossIncome = computed(() => cRevenue.value - cWages.value + cFoodSold.value);
const cEmploymentTax = computed(() => taxMultiplier.value * cBusinesses.value);
const cCorporateTax = computed(() => getCorporateTax(cGrossIncome.value - cEmploymentTax.value, tax.value));
const capitalistTax = computed(() => cEmploymentTax.value + cCorporateTax.value);

const totalTaxAllClasses = computed(() => workerTax.value + middleTax.value + capitalistTax.value);

// 4. Final Total Treasury with Total Tax from All Classes
const finalTreasury = computed(() => treasuryAfterWages.value + totalTaxAllClasses.value);
</script>

<template>
    <div class="state-class card">
        <h3>{{ $t('header.state') }}</h3>

        <div class="state-parameters">
            <div class="split">
                <Tooltip :text="$t('hint.state.treasury')">
                    <div class="parameter-label">{{ $t('taxes.treasury') }}</div>
                </Tooltip>
                <div class="state-parameter parameter-treasury">
                    <NumberInput :min="0" :max="999" :intervalTimeout="40" v-model.number="sTreasury" />
                </div>
            </div>
            <div class="split">
                <Tooltip :text="$t('hint.state.wages')">
                    <div class="parameter-label">{{ $t('taxes.wages') }}</div>
                </Tooltip>
                <div class="state-parameter parameter-wages">
                    <NumberInput :min="0" :max="999" :intervalTimeout="40" v-model.number="sWages" />
                </div>
            </div>
            <div class="split">
                <Tooltip :text="$t('hint.state.loans')">
                    <div class="parameter-label">{{ $t('taxes.loans') }}</div>
                </Tooltip>
                <div class="state-parameter parameter-loans">
                    <NumberInput :min="0" :max="99" v-model.number="sLoans" />
                </div>
            </div>
        </div>

        <!-- 1. Treasury after paying Wages (& receiving loans if deficit) -->
        <TaxFormula class="no-select">
            <div class="detailed-content">
                <div class="label-group no-break">
                    <div class="label-group-content">
                        {{ sTreasury }} <vardis /> &minus; {{ sWages }} <vardis /> &equals; {{ netTreasury }} <vardis />
                    </div>
                    <div class="label-group-label">{{ $t('taxes.treasury') }} &minus; {{ $t('taxes.wages') }}</div>
                </div>

                <template v-if="deficit > 0">
                    <span class="formula-separator">&rArr;</span>
                    <div class="label-group no-break">
                        <div class="label-group-content">
                            +{{ neededLoans }} {{ $t('taxes.loans') }} ({{ neededLoans * 50 }} <vardis />)
                        </div>
                        <div class="label-group-label">{{ $t('taxes.neededLoans') }}</div>
                    </div>
                </template>
            </div>

            <span class="detailed-content formula-separator">&rArr;&nbsp;</span>

            <span class="formula-result">
                <span :class="{ 'indicator-warn': imfAlertTriggered }">
                    {{ treasuryAfterWages }} <vardis />
                </span>
            </span>
        </TaxFormula>

        <!-- IMF Alert Banner -->
        <div v-if="imfAlertTriggered" class="state-imf-alert">
            <div class="parameter-icon icon-imf imf-alert-icon inverted" />
            <div class="imf-alert-text">
                {{ $t('state.imfAlert', { policy: fiscalLetter, loans: totalLoans }) }}
            </div>
        </div>

        <!-- 2. Final State Treasury with Total Tax from All Classes -->
        <TaxFormula class="no-select">
            <div class="detailed-content">
                <div class="label-group no-break">
                    <div class="label-group-content">
                        {{ treasuryAfterWages }} <vardis /> &plus; {{ totalTaxAllClasses }} <vardis /> &equals; {{ finalTreasury }} <vardis />
                    </div>
                    <div class="label-group-label">{{ $t('taxes.treasuryAfterWages') }} &plus; {{ $t('taxes.totalTaxes') }}</div>
                </div>
            </div>

            <span class="detailed-content formula-separator">&rArr;&nbsp;</span>

            <span class="formula-result">
                {{ finalTreasury }} <vardis />
            </span>
        </TaxFormula>
    </div>
</template>

<style lang="scss">
@use '@/assets/styles/breakpoints' as bp;

.state-class {
    container-type: inline-size;
    background-color: var(--c-class-state);
    color: var(--c-white);
    text-shadow: var(--c-app-bg) 0 0 1px;

    .state-parameters {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;

        @include bp.below('sm') {
            grid-template-columns: 1fr;
        }
    }

    .state-parameter {
        margin: 0.5em 10%;

        @include bp.below('sm') {
            margin: 0.5em 2.3em;
        }
    }

    .state-imf-alert {
        margin-top: 0.8em;
        padding: 0.6em 0.8em;
        background-color: rgba(223, 2, 49, 0.85);
        border: 1px solid var(--c-white);
        border-radius: 0.4rem;
        display: flex;
        align-items: center;
        gap: 0.8em;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);

        .imf-alert-icon {
            width: 2.2em;
            height: 2.2em;
            flex-shrink: 0;
        }

        .imf-alert-text {
            font-weight: bold;
            font-size: 0.95rem;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
        }
    }
}
</style>
