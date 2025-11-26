// This file will hold all our reusable formatting functions.

// 1. Define the mapping for our source systems
const sourceSystemDisplayNames: { [key: string]: string } = {
    ContractsFinder: 'Contracts Finder (CF)',
    FTS: 'Find a Tender Service (FTS)',
};

// 2. Create and export the reusable function
export const formatSourceSystem = (source: string | null | undefined): string => {
    if (!source) return 'N/A';
    // Look up the source in our map. If not found, just return the original source.
    return sourceSystemDisplayNames[source] || source;
};

// You can add other formatters here in the future, like formatDate, etc.