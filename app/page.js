'use client';

import React, { useState, useEffect, useRef } from 'react';
import LiveDisplay from './components/LiveDisplay';
import ActionControls from './components/ActionControls';
import Results from './components/Results';
import HowToUse from './components/HowToUse';
import Modal from './components/Modal';

const STORAGE_KEY = 'respiratory-monitor-recordings';

export default function Home() {
    // Component State
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [respirationCount, setRespirationCount] = useState(0);
    const [lastResult, setLastResult] = useState(null);
    const [recordings, setRecordings] = useState([]);
    
    // Modal State
    const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [renameValue, setRenameValue] = useState('');

    // Timer Ref
    const intervalRef = useRef(null);
    const startTimeRef = useRef(0);

    // --- Load Data from Local Storage ---
    useEffect(() => {
        try {
            const savedRecordings = localStorage.getItem(STORAGE_KEY);
            if (savedRecordings) {
                const parsed = JSON.parse(savedRecordings);
                if (parsed.length > 0) {
                    setLastResult(parsed[0]);
                    setRecordings(parsed.slice(1));
                }
            }
        } catch (error) {
            console.error("Error loading recordings from local storage:", error);
        }
    }, []);

    // --- Save Data to Local Storage ---
    useEffect(() => {
        try {
            const allRecordings = lastResult ? [lastResult, ...recordings] : recordings;
            if (allRecordings.length > 0) {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(allRecordings));
            } else {
                 localStorage.removeItem(STORAGE_KEY);
            }
        } catch (error) {
            console.error("Error saving recordings to local storage:", error);
        }
    }, [lastResult, recordings]);

    // --- Timer Logic ---
    useEffect(() => {
        if (isRunning) {
            startTimeRef.current = Date.now() - elapsedTime;
            intervalRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current);
            }, 100);
        } else {
            clearInterval(intervalRef.current);
        }
        return () => clearInterval(intervalRef.current);
    }, [isRunning]);
    
    // --- Core Functions ---
    const handleRespirationPress = () => {
        if (!isRunning) {
            setIsRunning(true);
            setRespirationCount(1);
        } else {
            setRespirationCount(prev => prev + 1);
        }
    };

    const handleStop = () => {
        if (!isRunning) return;
        setIsRunning(false);
        const finalElapsedTime = elapsedTime;
        const finalElapsedTimeInSeconds = finalElapsedTime / 1000;

        if (finalElapsedTimeInSeconds > 0 && respirationCount > 0) {
            const rate = Math.round((respirationCount / finalElapsedTimeInSeconds) * 60);
            saveRecording(rate, finalElapsedTime, respirationCount);
        }
    };

    const handleReset = () => {
        setIsRunning(false);
        setElapsedTime(0);
        setRespirationCount(0);
    };

    // --- Local Storage & Modal CRUD Functions ---
    const saveRecording = (rate, duration, breathCount) => {
        const newRecording = {
            id: crypto.randomUUID(),
            name: `Recording ${new Date().toLocaleString()}`,
            rate: rate,
            duration: duration,
            breathCount: breathCount,
            createdAt: new Date().toISOString()
        };
        if(lastResult) {
            setRecordings(prev => [lastResult, ...prev]);
        }
        setLastResult(newRecording);
    };

    const openRenameModal = (item) => {
        setCurrentItem(item);
        setRenameValue(item.name);
        setIsRenameModalOpen(true);
    };

    const confirmRename = () => {
        if (!renameValue.trim() || !currentItem) return;

        if (currentItem.isLastResult) {
            setLastResult(prev => ({ ...prev, name: renameValue.trim() }));
        } else {
            setRecordings(prev => prev.map(rec => 
                rec.id === currentItem.id ? { ...rec, name: renameValue.trim() } : rec
            ));
        }
        closeModals();
    };

    const openDeleteModal = (item) => {
        setCurrentItem(item);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (!currentItem) return;
        if(currentItem.isLastResult) {
            setLastResult(null);
        } else {
            setRecordings(prev => prev.filter(rec => rec.id !== currentItem.id));
        }
        closeModals();
    };

    const closeModals = () => {
        setIsRenameModalOpen(false);
        setIsDeleteModalOpen(false);
        setCurrentItem(null);
        setRenameValue('');
    };

    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="w-full max-w-lg mx-auto bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl shadow-2xl p-6 space-y-6">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-blue-400">Respiration Monitor</h1>
                </div>
                
                <LiveDisplay elapsedTime={elapsedTime} respirationCount={respirationCount} />
                
                <ActionControls 
                    onRespirationPress={handleRespirationPress}
                    onStop={handleStop}
                    onReset={handleReset}
                    isRunning={isRunning}
                />
                
                <Results 
                    lastResult={lastResult}
                    recordings={recordings}
                    onRename={openRenameModal}
                    onDelete={openDeleteModal}
                />

                <HowToUse />

            </div>

            {/* --- Modals --- */}
            <Modal isOpen={isRenameModalOpen}>
                <h3 className="text-lg font-bold text-white mb-4">Rename Recording</h3>
                <input 
                    type="text"
                    value={renameValue}
                    onChange={(e) => setRenameValue(e.target.value)}
                    className="w-full bg-slate-700 text-white rounded-md p-2 border border-slate-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <div className="flex justify-end gap-3 mt-5">
                    <button onClick={closeModals} className="px-4 py-2 rounded-md text-slate-300 hover:bg-slate-700 transition-colors">Cancel</button>
                    <button onClick={confirmRename} className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors">Save</button>
                </div>
            </Modal>
            
            <Modal isOpen={isDeleteModalOpen}>
                <h3 className="text-lg font-bold text-white mb-2">Are you sure?</h3>
                <p className="text-slate-400 mb-5">You won't be able to revert this.</p>
                <div className="flex justify-end gap-3">
                    <button onClick={closeModals} className="px-4 py-2 rounded-md text-slate-300 hover:bg-slate-700 transition-colors">Cancel</button>
                    <button onClick={confirmDelete} className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors">Delete</button>
                </div>
            </Modal>
        </main>
    );
}
