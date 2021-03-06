import TestRunner from 'test-runner'
import commandLineArgs from '../index.mjs'
import a from 'assert'

const tom = new TestRunner.Tom()

tom.test('two flags, one option, nothing set', function () {
  const optionDefinitions = [
    { name: 'verbose', alias: 'v', type: Boolean },
    { name: 'recursive', alias: 'r', type: Boolean },
    { name: 'file', alias: 'f' }
  ]

  const argv = []
  a.deepStrictEqual(commandLineArgs(optionDefinitions, { argv }), {})
})

tom.test('two flags, one option', function () {
  const optionDefinitions = [
    { name: 'verbose', alias: 'v', type: Boolean },
    { name: 'recursive', alias: 'r', type: Boolean },
    { name: 'file', alias: 'f' }
  ]

  const argv = ['-vrf', 'yeah']
  a.deepStrictEqual(commandLineArgs(optionDefinitions, { argv }), {
    verbose: true,
    recursive: true,
    file: 'yeah'
  })
})

tom.test('two flags, one option 2', function () {
  const optionDefinitions = [
    { name: 'verbose', alias: 'v', type: Boolean },
    { name: 'recursive', alias: 'r', type: Boolean },
    { name: 'file', alias: 'f' }
  ]

  const argv = ['-f', 'yeah', '-vr']
  a.deepStrictEqual(commandLineArgs(optionDefinitions, { argv }), {
    verbose: true,
    recursive: true,
    file: 'yeah'
  })
})

tom.test('three string options', function () {
  const optionDefinitions = [
    { name: 'plugin', alias: 'p' },
    { name: 'depth', alias: 'd' },
    { name: 'file', alias: 'f' }
  ]

  const argv = ['-pdf', 'yeah']
  a.throws(
    () => commandLineArgs(optionDefinitions, { argv }),
    /UNKNOWN_VALUE/
  )
})

tom.test('three string options, partial', function () {
  const optionDefinitions = [
    { name: 'plugin', alias: 'p' },
    { name: 'depth', alias: 'd' },
    { name: 'file', alias: 'f' }
  ]

  const argv = ['-pdf', 'yeah']
  a.deepStrictEqual(commandLineArgs(optionDefinitions, { argv, partial: true }), {
    plugin: 'df',
    _unknown: ['yeah']
  })
})

export default tom
