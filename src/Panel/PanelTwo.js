import React, { useState, useEffect } from 'react'
import { Transition } from '@headlessui/react'
// import TrapFocus from '@mui/material/Unstable_TrapFocus';
// import Backdrop from '@mui/material/Backdrop';

const Panel = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return <div className="flex bg-gray-100">
        <Transition
            // show={isSidebarOpen}
            // enter="transition-all duration-300"
            // enterFrom="-ml-64"
            // enterTo="ml-0"
            // leave="transition-all duration-300"
            // leaveFrom="ml-0"
            // leaveTo="-ml-64"
        >
            <sidebar className="bg-white w-64 min-h-screen flex flex-col">
                <span>Application</span>
            </sidebar>
        </Transition>
        <main className="flex-grow flex flex-col min-h-screen">
            <header className="header background-white border-b h-10 flex items-center justify-between">
                <div onClick={() => setIsSidebarOpen(!isSidebarOpen)}>{isSidebarOpen ? "Close" : "Open"}</div>
                <div>Home</div>
                <button className="text-blue-700 underline">Log in</button>
            </header>
        </main>
    </div>
}

export default Panel;


/*
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
*/