module.exports = {
    preset: 'react',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '\\.(css|less|scss)$': 'identity-obj-proxy',
    },
    collectCoverage: true,
    collectCoverageFrom: [
        "src/**/*.{js,jsx}",
        "!src/index.js"
    ],
    setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
};
