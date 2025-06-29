import React from 'react';
import { LungsIcon } from './Icons';

const ActionControls = ({ onRespirationPress, onStop, onReset, isRunning }) => {
    return (
        <>
            <div className="flex justify-center py-4">
                <button 
                    onClick={onRespirationPress} 
                    className={`flex items-center justify-center w-48 h-48 rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 ${isRunning ? 'bg-blue-600 shadow-[0_0_25px_theme(colors.blue.500)] animate-pulse' : 'bg-slate-700 hover:bg-slate-600'}`}
                >
                    <LungsIcon />
                </button>
            </div>
            <div className="flex justify-center gap-4">
                <button 
                    onClick={onStop} 
                    disabled={!isRunning} 
                    className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 rounded-lg text-white font-semibold transition-colors disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed"
                >
                    Stop
                </button>
                <button 
                    onClick={onReset} 
                    className="w-full py-3 px-4 bg-slate-600 hover:bg-slate-500 rounded-lg text-white font-semibold transition-colors"
                >
                    Reset
                </button>
            </div>
        </>
    );
};

export default ActionControls;