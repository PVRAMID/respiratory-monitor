import React from 'react';

const Modal = ({ children, isOpen }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className="bg-slate-800 rounded-lg shadow-xl p-6 w-full max-w-sm">
                {children}
            </div>
        </div>
    );
};

export default Modal;