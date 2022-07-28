import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
const path = require(`path`)
fs = require('fs')

const aliases = {
  'App': 'src/Base/Exports',
  'Hooks': 'src/Hooks/Exports',
  'Contexts': 'src/Contexts/Exports',
  '@Form': 'src/Components/Form/Exports',
  '@List': 'src/Components/List/Exports',
  '@Browse': 'src/Components/Browse/Exports',
  '@Tree': 'src/Components/Tree/Exports',
  '@Tab': 'src/Components/Tab/Exports',
  '@Dashboard': 'src/Components/Dashboard/Exports',
  '@Panel': 'src/Panel/Exports',
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

console.log(aliases)

const resolvedAliases = Object.fromEntries(
  Object.entries(aliases).map(([key, value]) => [key, path.resolve(__dirname, value)]),
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