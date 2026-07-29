export default {
    header: {
        multiplier: 'Steuermultiplikator',
        workingclass: 'Arbeiterklasse',
        middleclass: 'Mittelschicht',
        capitalist: 'Kapitalist',
        state: 'Staat',
    },
    taxes: {
        income: 'Einkommenssteuer',
        corporate: 'Körperschaftssteuer',
        employment: 'Lohnsteuer',
        revenue: 'Einnahmen',
        foodSold: 'Verkaufte Lebensmittel',
        grossIncome: 'Bruttoeinkommen',
        treasury: 'Staatskasse',
        wages: 'Löhne',
        loans: 'Kredite',
        neededLoans: 'Benötigte neue Kredite',
        totalLoans: 'Gesamtkredite',
    },
    policy: {
        fiscal: 'Fiskalpolitik',
        labor: 'Arbeitsmarkt',
        tax: 'Steuern',
        health: 'Gesundheit',
        education: 'Bildung',
        unknown: 'Unbekannte Politik',
    },
    hint: {
        worker: {
            incomeTax: 'Bevölkerung (der untere Wert der Bevölkerungsleiste)',
        },
        middle: {
            incomeTax: 'Anzahl **fremder** Unternehmen in denen deine Arbeitskräfte tätig sind',
            employmentTax: 'Anzahl deiner **betriebsfähigen** Unternehmen',
        },
        capitalist: {
            revenue: 'Geld im Einnahmenbereich vor Abzügen',
            wages: 'Gezahlte Löhne, die von den Einnahmen abgezogen werden',
            foodSold: 'Verkaufte Lebensmittel, die zu den Einnahmen hinzugerechnet werden',
            corporateTax: 'Bruttoeinkommen (Einnahmen - Löhne + Lebensmittel) vor Steuern',
            employmentTax: 'Anzahl deiner **betriebsfähigen** Unternehmen',
        },
        state: {
            treasury: 'Geld in der Staatskasse',
            wages: 'Zu zahlende Löhne',
            loans: 'Bestehende Staatskredite',
        },
    },
    state: {
        imfAlert: 'IWF-Intervention ausgelöst! (Fiskalpolitik: {policy}, Gesamtkredite: {loans})',
    },
};