import { defineStore, storeToRefs } from 'pinia';
import { useStorage } from '@vueuse/core';
import { computed } from 'vue';

export const usePolicyStore = defineStore('policies', () => {
    const fiscal = useStorage('policies.fiscal', 2);
    const labor = useStorage('policies.labor', 1);
    const tax = useStorage('policies.tax', 0);
    const health = useStorage('policies.health', 1);
    const education = useStorage('policies.education', 2);
    const imfLabor = useStorage('imfPolicy.labor', -1);

    const imfActive = computed(() => imfLabor.value >= 0);
    const laborValue = computed(() => (imfActive.value ? imfLabor.value : labor.value));
    const imfRelevant = computed(() => laborValue.value != labor.value);

    const taxMultiplier = computed(
        () =>
            3 - tax.value + Math.abs(health.value - 2) * Math.abs(tax.value - 2) + Math.abs(education.value - 2) * Math.abs(tax.value - 2),
    );

    const incomeTax = computed(
        () =>
            [
                [7, 6, 5],
                [4, 4, 4],
                [1, 2, 3],
            ][Number(laborValue.value)][Number(tax.value)],
    );

    function $reset() {
        fiscal.value = 2;
        labor.value = 1;
        tax.value = 0;
        health.value = 1;
        education.value = 2;
        imfLabor.value = -1;
    }

    function $imf(applyChanges = true) {
        if (imfLabor.value !== -1) {
            imfLabor.value = -1;
            return;
        }

        imfLabor.value = labor.value;
        if (!applyChanges) return;

        fiscal.value = 2;
        labor.value = 2;
        tax.value = 0;
        health.value = 1;
        education.value = 2;
    }

    return {
        fiscal,
        labor,
        tax,
        health,
        education,
        taxMultiplier,
        incomeTax,
        imfLabor,
        imfActive,
        imfRelevant,
        $reset,
        $imf,
    };
});

export const getPolicyStore = () => {
    const store = usePolicyStore();
    return { store, ...storeToRefs(store) };
};