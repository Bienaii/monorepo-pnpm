const path = require('path')
const args = require('minimist')(process.argv.slice(2))
const { build } = require('esbuild')
// minimist 解析命令行参数 简单好用

const target = args._[0] || 'project'

const format = args.f || 'global'

const packageName = require(`../packages/${target}/package.json`).buildOptions.name

// 入口文件
const entry = path.resolve(__dirname, `../packages/${target}/src/index.ts`)

// 打包格式
const outputFormat = format.startsWith('global') ? 'iife' : format === 'cjs' ? 'cjs' : 'esm' 

// 出口文件
const outfile = path.resolve(__dirname, `../packages/${target}/dist/${target}-${format}.js`)

build({
  entryPoints: [entry],
  outfile,
  bundle: true,
  sourcemap: true,
  format: outputFormat,
  globalName: packageName,
  platform: format === 'cjs' ?  'node' : 'browser'
}).then(() => {
  console.log('watching...')
})

