module.exports = {
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(js|ts)$',
  moduleFileExtensions: ['js', 'ts', 'json', 'vue'],
  transform: {
    '.*\\.(vue)$': 'vue-jest',
    '^.+\\.(ts)$': 'ts-jest',
    '^.+\\.(js)$': 'babel-jest'
  },
  snapshotSerializers: [
    'jest-serializer-vue'
  ],
  setupFiles: [
    '<rootDir>/test/setup.ts'
  ]
}
