<script setup lang="ts">
import { computed } from 'vue';
import { getPolicyStore } from '@/stores/policies';
import { getClassStore } from '@/stores/classes';
import Tooltip from '@/components/Tooltip.vue';

const { fiscal } = getPolicyStore();
const { sTreasury, sWages, sLoans } = getClassStore();

const netTreasury = computed(() => sTreasury.value - sWages.value);
const deficit = computed(() => (netTreasury.value < 0 ? Math.abs(netTreasury.value) : 0));
const neededLoans = computed(() => (deficit.value > 0 ? Math.ceil(deficit.value / 50) : 0));
const totalLoans = computed(() => sLoans.value + neededLoans.value);

const fiscalLetter = computed(() => ['A', 'B', 'C'][fiscal.value] ?? 'A');

const imfAlertTriggered = computed(() => {
    if (fiscal.value === 2) {
        return totalLoans.value >= 1;
    } else {
        return totalLoans.value >= 2;
    }
});
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
                    <div class="parameter-icon icon-loan" />
                </Tooltip>
                <div class="state-parameter parameter-loans">
                    <NumberInput :min="0" :max="99" v-model.number="sLoans" />
                </div>
            </div>
        </div>

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
                <span :class="{ 'indicator-warn': imfAlertTriggered }"> {{ totalLoans }} {{ $t('taxes.loans') }} </span>
            </span>
        </TaxFormula>

        <div v-if="imfAlertTriggered" class="state-imf-alert">
            <div class="parameter-icon icon-imf imf-alert-icon" />
            <div class="imf-alert-text">
                {{ $t('state.imfAlert', { policy: fiscalLetter, loans: totalLoans }) }}
            </div>
        </div>
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
