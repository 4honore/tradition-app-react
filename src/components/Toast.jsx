import React, { useEffect } from 'react';

function Toast({ message, onClose }) {
    useEffect(() => {
        // Auto-dismiss after 3 seconds
        const timer = setTimeout(() => {
            // Safety check: only call onClose if it exists and is a function
            if (typeof onClose === 'function') {
                onClose();
            }
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="toast-notification">
            <span className="toast-icon">✅</span>
            <p>{message}</p>
        </div>
    );
}

export default Toast;