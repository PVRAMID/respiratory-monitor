import React from 'react';
import RecordingItem from './RecordingItem';

const Results = ({ lastResult, recordings, onRename, onDelete }) => {
    return (
        <>
            {lastResult && (
                <div className="space-y-3 pt-4">
                    <h2 className="text-xl font-semibold text-blue-400 border-b border-slate-700 pb-2">Last Result</h2>
                    <RecordingItem 
                        rec={lastResult} 
                        isLastResult={true}
                        onRename={() => onRename({ ...lastResult, isLastResult: true })}
                        onDelete={() => onDelete({ ...lastResult, isLastResult: true })}
                    />
                </div>
            )}
            <div className="space-y-4 pt-4">
                <h2 className="text-xl font-semibold text-blue-400 border-b border-slate-700 pb-2">Previous Recordings</h2>
                <div className="max-h-60 overflow-y-auto space-y-2 pr-2">
                    {recordings.length > 0 ? (
                        recordings.map(rec => 
                            <RecordingItem 
                                key={rec.id}
                                rec={rec} 
                                isLastResult={false} 
                                onRename={() => onRename({ ...rec, isLastResult: false })}
                                onDelete={() => onDelete({ ...rec, isLastResult: false })}
                            />
                        )
                    ) : (
                        <p className="text-center text-slate-500 py-4">Older recordings will appear here.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default Results;