<script setup lang="ts">
import { computed, ref } from 'vue';
import NumberSlider from './NumberSlider.vue';
import { getPolicyStore } from '@/stores/policies';
const { fiscal, labor, tax, health, education, imfLabor, imfRelevant } = getPolicyStore();

const props = defineProps<{ policy?: 'fiscal' | 'labor' | 'tax' | 'health' | 'education' }>();

function policyIndex(name: string | undefined) {
    switch (name) {
        case 'fiscal':
            return 1;
        case 'labor':
            return 2;
        case 'tax':
            return 3;
        case 'health':
            return 4;
        case 'education':
            return 5;
        default:
            return 0;
    }
}

const policyNumber = computed(() => policyIndex(props.policy));

const policyName = computed(() => {
    return ['policy.unknown', 'policy.fiscal', 'policy.labor', 'policy.tax', 'policy.health', 'policy.education'][policyNumber.value];
});

const policyValue = [ref(-1), fiscal, labor, tax, health, education][policyNumber.value];
const indicatorValue = props.policy === 'labor' ? imfLabor : ref(-1);
</script>

<template>
    <div class="card narrow split policy no-select" :class="{ ['policy-' + props.policy]: true }">
        <div class="policy-column policy-number">
            <div class="thin">
                {{ policyNumber }}
            </div>
        </div>

        <div class="policy-column policy-slider">
            <h3>{{ $t(policyName) }}</h3>
            <NumberSlider
                :class="{ soft: !imfRelevant }"
                v-model:value.number="policyValue"
                v-model:indicator.number="indicatorValue"
                min="0"
                max="2"
                :format="(x: number) => ['A', 'B', 'C'][x]"
            />
        </div>
    </div>
</template>

<style lang="scss">
@use '@/assets/styles/breakpoints' as bp;

.policy {
    container-type: inline-size;
    color: var(--c-white);
    text-shadow: var(--c-app-bg) 0 0 1px;
    transition: 0.2s ease-in-out;

    &.policy-fiscal {
        background-color: var(--c-policy-fiscal);
    }

    &.policy-labor {
        background-color: var(--c-policy-labor);
    }

    &.policy-tax {
        background-color: var(--c-policy-tax);
    }

    &.policy-health {
        background-color: var(--c-policy-health);
    }

    &.policy-education {
        background-color: var(--c-policy-education);
    }

    h3 {
        margin-bottom: 0.5em;
    }

    @include bp.between('md', 'lg') {
        grid-template-columns: 2em 1fr;
        padding-left: 0.6em;
    }

    .policy-number {
        display: table;
        margin-right: 0.6em;
        border-right: 1px solid var(--c-grey-200);

        @include bp.between('md', 'lg') {
            margin-right: 0.2em;
        }

        & > div {
            display: table-cell;
            vertical-align: middle;
            text-align: center;

            transition:
                margin 0.2s ease-in-out,
                line-height 0.2s ease-in-out;

            padding-right: 0.1em;
            /* Fluid with the policy card's width: eases down as the card
               narrows in the two-column band, up to 3.5rem on wide cards. */
            font-size: clamp(2.2rem, 14cqi, 3.5rem);
            font-weight: 400;
        }
    }
}
</style>
