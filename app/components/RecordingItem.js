import React, { useState } from 'react';
import { ClipboardIcon, EditIcon, DeleteIcon } from './Icons';

const RecordingItem = ({ rec, isLastResult, onRename, onDelete }) => {
    const [copied, setCopied] = useState(false);
    
    const formatDate = (isoString) => {
        if (!isoString) return '...';
        return new Date(isoString).toLocaleString();
    };
    
    const handleCopyToClipboard = () => {
        const durationSeconds = (rec.duration / 1000).toFixed(1);
        let textToCopy = `Time of Examination: ${formatDate(rec.createdAt)}\n`;
        textToCopy += `Duration of Test: ${durationSeconds} seconds\n`;
        textToCopy += `Breaths Recorded: ${rec.breathCount}\n`;
        textToCopy += `Calculation for Average: (${rec.breathCount} breaths / ${durationSeconds} seconds) * 60 = ${rec.rate} BPM`;

        const textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
        document.body.removeChild(textArea);
    };
    
    const itemClass = isLastResult 
        ? "bg-gradient-to-br from-blue-500 to-blue-700 p-4 rounded-lg flex items-center justify-between gap-4 shadow-lg"
        : "bg-slate-900/70 p-3 rounded-lg flex items-center justify-between gap-4";
    
    const textColor = isLastResult ? "text-white" : "text-blue-400";
    const subTextColor = isLastResult ? "text-blue-200" : "text-slate-400";
        
    return (
        <div className={itemClass}>
            <div className="flex-1 overflow-hidden">
                <p className={`font-bold truncate ${isLastResult ? 'text-lg' : ''}`}>{rec.name}</p>
                <p className={`text-xs ${subTextColor}`}>{`Recorded for ${(rec.duration / 1000).toFixed(1)}s`}</p>
            </div>
            <div className="flex items-center gap-4">
                <p className={`text-4xl font-extrabold ${textColor}`}>{rec.rate} <span className="text-2xl font-semibold">BPM</span></p>
                <div className="flex flex-col gap-2 items-center">
                    <div className="flex gap-2">
                         <button onClick={handleCopyToClipboard} className={`p-2 ${subTextColor} hover:text-white transition-colors`}><ClipboardIcon /></button>
                         <button onClick={onRename} className={`p-2 ${subTextColor} hover:text-white transition-colors`}><EditIcon /></button>
                         <button onClick={onDelete} className={`p-2 ${subTextColor} hover:text-red-500 transition-colors`}><DeleteIcon /></button>
                    </div>
                    {copied && <span className="text-green-400 text-xs animate-pulse">Copied!</span>}
                </div>
            </div>
        </div>
    );
};

export default RecordingItem;
