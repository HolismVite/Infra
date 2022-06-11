import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

const path = require(`path`)
const aliases = {
  '@Form': 'src/Components/Form/Exports',
  '@List': 'src/Components/List/Exports',
  '@Browse': 'src/Components/Browse/Browse',
  '@Tree': 'src/Components/Tree/Exports',
  '@Tab': 'src/Components/Tab/Exports',
  '@Dashboard': 'src/Components/Dashboard/Dashboard',
  '@Panel': 'src/Panel/Panel',
}

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