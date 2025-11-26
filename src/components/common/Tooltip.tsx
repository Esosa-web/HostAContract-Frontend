import React, { ReactNode } from 'react';

// This is the exact Tooltip component you wrote, just moved to its own file.
const Tooltip = ({ text, children }: { text: string; children: ReactNode }) => (
    <div className="group relative flex items-center cursor-help" tabIndex={0}>
        {children}
        <div role="tooltip" className="absolute bottom-full left-1/2 z-20 mb-2 w-60 -translate-x-1/2 rounded-lg bg-gray-900 p-3 text-sm text-white shadow-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus:opacity-100 pointer-events-none">
            {text}
            <div className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 border-x-4 border-x-transparent border-t-4 border-t-gray-900" />
        </div>
    </div>
);

export default Tooltip;