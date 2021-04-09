const {pathsToModuleNameMapper} = require('ts-jest/utils')
const {compilerOptions} = require('./tsconfig.json')

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    modulePaths: ['<rootDir>/resources/'],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
    verbose: true,
    transform: {
        '^.+\\.[jt]s$': 'babel-jest',
        '.+\\.(svg|css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
            'jest-transform-stub',
    },
}
