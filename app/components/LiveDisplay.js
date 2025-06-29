import React from 'react';

const LiveDisplay = ({ elapsedTime, respirationCount }) => {
    const formatTime = (time) => {
        const totalSeconds = Math.floor(time / 1000);
        const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
        const seconds = (totalSeconds % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    return (
        <div className="grid grid-cols-2 gap-4 text-center bg-slate-900/70 p-4 rounded-xl">
            <div>
                <p className="text-sm text-slate-400">Time Elapsed</p>
                <p className="text-5xl font-mono font-bold text-white">{formatTime(elapsedTime)}</p>
            </div>
            <div>
                <p className="text-sm text-slate-400">Breaths</p>
                <p className="text-5xl font-mono font-bold text-white">{respirationCount}</p>
            </div>
        </div>
    );
};

export default LiveDisplay;