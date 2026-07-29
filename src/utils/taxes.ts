export const corporateTaxTable = {
    4: [0, 0, 0],
    9: [1, 2, 2],
    24: [5, 5, 4],
    49: [12, 10, 7],
    99: [24, 15, 10],
    199: [40, 30, 20],
    299: [100, 70, 40],
    99999: [160, 120, 60],
};

export function getCorporateTax(income: number, policy: number): number {
    for (const [key, value] of Object.entries(corporateTaxTable)) {
        if (income <= Number(key)) {
            return value[policy] ?? NaN;
        }
    }
    return NaN;
}
