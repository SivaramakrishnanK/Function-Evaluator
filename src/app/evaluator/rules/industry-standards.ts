export const industryStandards = {
    namingConventions: {
        variableNames: 'CamelCase',
        functionNames: 'camelCase',
        classNames: 'PascalCase',
    },
    complexity: {
        maxCyclomaticComplexity: 10,
        maxLinesPerFunction: 50,
    },
    documentation: {
        requiresJSDoc: true,
        minComments: 2,
    },
    performance: {
        avoidGlobalVariables: true,
        preferConstOverLet: true,
    },
    security: {
        validateInput: true,
        avoidEval: true,
    },
};

export const customRules = {
    maxParameters: 5,
    requireReturnType: true,
    enforceStrictMode: true,
};