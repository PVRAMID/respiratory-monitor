import React from 'react';
import { InfoIcon } from './Icons';

const HowToUse = () => {
    return (
        <div className="mt-4 pt-6 border-t border-slate-700 space-y-6">
            <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                <h2 className="text-lg font-semibold text-blue-400 mb-3 flex items-center"><InfoIcon/> How to Use</h2>
                <p className="text-slate-300 text-sm mb-4">
                    This tool calculates an average respiratory rate. This allows you to record for as much or as little time as is required.
                </p>
                <div className="bg-amber-900/40 border-l-4 border-amber-500 text-amber-300 p-3 rounded-r-lg">
                    <p className="font-semibold">Clinical Note</p>
                    <p className="text-sm mt-1">
                        Relying on an average may not be appropriate in a case of irregular respirations. A full 60 second recording may be more appropriate for an accurate assessment.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HowToUse;