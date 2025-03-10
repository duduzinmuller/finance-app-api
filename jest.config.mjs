/** @type {import('jest').Config} */
const config = {
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    collectCoverageFrom: ['src/**/*.js'],
    globalSetup: '<rootDir>/jest.global-setup.mjs',
}

export default config
