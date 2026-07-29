export default {
    header: {
        multiplier: 'Multiplicador de impuestos',
        workingclass: 'Clase trabajadora',
        middleclass: 'Clase media',
        capitalist: 'Clase capitalista',
        state: 'Estado',
    },
    taxes: {
        income: 'Impuesto sobre la renta',
        corporate: 'Impuesto corporativo',
        employment: 'Impuesto de empleo',
        revenue: 'Ingresos',
        foodSold: 'Comida vendida',
        coverNeeds: 'Cubrir necesidades',
        grossIncome: 'Ingresos brutos',
        treasury: 'Tesorería',
        wages: 'Salarios',
        loans: 'Préstamos',
        neededLoans: 'Nuevos préstamos necesarios',
        totalLoans: 'Préstamos totales',
        finalTreasury: 'Tesorería final',
        imf: 'IMF Check',
    },
    policy: {
        fiscal: 'Política fiscal',
        labor: 'Mercado laboral',
        tax: 'Impuestos',
        health: 'Sanidad y prestaciones',
        education: 'Educación',
        unknown: 'Política desconocida',
    },
    hint: {
        worker: {
            incomeTax: 'Tamaño de la población (el número más bajo en la pista de población)',
        },
        middle: {
            incomeTax: 'El número de empresas, además de la tuya, donde tienes trabajadores',
            employmentTax: 'Empresas **operativas** que posees',
        },
        capitalist: {
            revenue: 'Dinero en el área de ingresos antes de deducciones',
            wages: 'Salarios pagados que deducen de los ingresos',
            foodSold: 'Comida vendida que añade a los ingresos',
            corporateTax: 'Ingresos brutos (Ingresos - Salarios + Comida vendida) antes de impuestos',
            employmentTax: 'Empresas **operativas** que posees',
        },
        state: {
            treasury: 'Dinero en la tesorería del Estado',
            wages: 'Salarios a pagar',
            loans: 'Préstamos actuales del Estado',
        },
    },
    state: {
        imfAlert: '¡Intervención del FMI activada! (Política fiscal: {policy}, Préstamos totales: {loans})',
    },
};
