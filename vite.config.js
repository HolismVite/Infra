import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
const path = require(`path`)
fs = require('fs')

const aliases = {
  'App': 'src/Base/Exports',
  'Browse': 'src/Components/Browse/Exports',
  'Contexts': 'src/Contexts/Exports',
  'Dashboard': 'src/Components/Dashboard/Exports',
  'Form': 'src/Components/Form/Exports',
  'Hooks': 'src/Hooks/Exports',
  'List': 'src/Components/List/Exports',
  'Panel': 'src/Panel/Exports',
  'Tab': 'src/Components/Tab/Exports',
  'Tree': 'src/Components/Tree/Exports',
}

try {
  const dirs = fs.readdirSync(path.resolve(__dirname, 'src'))
  const baseDirs = ['Base', 'Components', 'Contexts', 'Hooks', 'Panel']
  dirs.forEach(dir => {
    if (baseDirs.indexOf(dir) > -1) {
      return;
    }
    if (dir === '.git' || dir === 'favicons' || dir === 'Branding') {
      return;
    }
    if (!fs.lstatSync(path.resolve(__dirname, 'src', dir)).isDirectory()) {
      return;
    }
    var exportFile = path.resolve(__dirname, 'src', dir, 'Exports.jsx')
    if (fs.existsSync(exportFile)) {
      aliases[dir] = `src/${dir}/Exports`
    }
  })
} catch (error) {
  console.log(error)
}

const orderedAliases = Object.keys(aliases).sort().reduce(
  (obj, key) => {
    obj[key] = aliases[key];
    return obj;
  },
  {}
);

console.log(orderedAliases)

const resolvedAliases = Object.fromEntries(
  Object.entries(orderedAliases).map(([key, value]) => [key, path.resolve(__dirname, value)]),
)

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.')

  console.log(env)

  const htmlPlugin = () => {
    return {
      name: "html-transform",
      transformIndexHtml(html) {
        return html.replace(/%(.*?)%/g, function (match, p1) {
          return env[p1]
        })
      },
    }
  }

  return {
    resolve: {
      alias: resolvedAliases,
      preserveSymlinks: true
    },
    plugins: [react(), htmlPlugin(), svgr()],
    server: {
      host: '0.0.0.0',
      hmr: {
        clientPort: 443
      }
    }
  }
})