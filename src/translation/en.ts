export default {
    header: {
        multiplier: 'Tax Multiplier',
        workingclass: 'Working Class',
        middleclass: 'Middle Class',
        capitalist: 'Capitalist Class',
        state: 'State',
    },
    taxes: {
        income: 'Income Tax',
        corporate: 'Corporate Tax',
        employment: 'Employment Tax',
        revenue: 'Revenue',
        foodSold: 'Food Sold',
        coverNeeds: 'Cover Needs',
        grossIncome: 'Gross Income',
        treasury: 'Treasury',
        wages: 'Wages',
        loans: 'Loans',
        neededLoans: 'New Loans Needed',
        totalLoans: 'Total Loans',
        treasuryAfterWages: 'Treasury after Wages',
        totalTaxes: 'Total Taxes',
        finalTreasury: 'Final Treasury',
    },
    policy: {
        fiscal: 'Fiscal Policy',
        labor: 'Labor Market',
        tax: 'Taxation',
        health: 'Healthcare & Benefits',
        education: 'Education',
        unknown: 'Unknown Policy',
    },
    hint: {
        worker: {
            incomeTax: 'Population Size (the lower number of the population track)',
        },
        middle: {
            incomeTax: 'The number of Companies, other than your own, where you have Workers',
            employmentTax: '**Operational** Companies you own',
        },
        capitalist: {
            revenue: 'Money in the Revenue area before deductions',
            wages: 'Wages paid to workers that deduct from Revenue',
            foodSold: 'Food sold that adds to Revenue',
            corporateTax: 'Gross income (Revenue - Wages + Food Sold) before taxes',
            employmentTax: '**Operational** Companies you own',
        },
        state: {
            treasury: 'State Treasury money',
            wages: 'Wages to be paid',
            loans: 'Current State Loans',
        },
    },
    state: {
        imfAlert: 'IMF Intervention Triggered! (Fiscal Policy: {policy}, Total Loans: {loans})',
    },
};