import app from 'App'

const DevMode = () => {
    return app.isDev() && <span className="font-bold text-red-400 m-12 animate-pulse">DEV‌ MODE</span>
}

export default DevMode