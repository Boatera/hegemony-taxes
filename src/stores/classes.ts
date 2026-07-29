import { defineStore, storeToRefs } from 'pinia';
import { useStorage } from '@vueuse/core';

export const useClassStore = defineStore('classes', () => {
    const population = useStorage('classes.population', 3);
    const mBusinesses = useStorage('classes.mBusinesses', 2);
    const mEmployments = useStorage('classes.mEmployments', 2);
    const cIncome = useStorage('classes.cIncome', 120);
    const cBusinesses = useStorage('classes.cBusinesses', 3);
    const cRevenue = useStorage('classes.cRevenue', 120);
    const cWages = useStorage('classes.cWages', 0);
    const cFoodSold = useStorage('classes.cFoodSold', 0);
    const sTreasury = useStorage('classes.sTreasury', 150);
    const sWages = useStorage('classes.sWages', 0);
    const sLoans = useStorage('classes.sLoans', 0);

    function $reset() {
        population.value = 3;
        mBusinesses.value = 2;
        mEmployments.value = 2;
        cIncome.value = 120;
        cBusinesses.value = 3;
        cRevenue.value = 120;
        cWages.value = 0;
        cFoodSold.value = 0;
        sTreasury.value = 150;
        sWages.value = 0;
        sLoans.value = 0;
    }

    return {
        population,
        mBusinesses,
        mEmployments,
        cIncome,
        cBusinesses,
        cRevenue,
        cWages,
        cFoodSold,
        sTreasury,
        sWages,
        sLoans,
        $reset,
    };
});

export const getClassStore = () => {
    const store = useClassStore();
    return { store, ...storeToRefs(store) };
};