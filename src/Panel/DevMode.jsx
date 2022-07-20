import app from 'App'

const DevMode = () => {
    return app.isDev() && <div className="flex items-center m-12 gap-4">
        {/* <span class="flex h-3 w-3">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
        </span>
        <span className="w-4 h-4 bg-red-400 animate-ping rounded-full"></span> */}
        <span className="font-bold text-red-400 animate-pulse">DEV‌ MODE</span>
    </div>
}

export default DevMode