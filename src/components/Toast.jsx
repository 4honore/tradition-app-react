import React, { useEffect } from 'react';

function Toast({ message, image, type = 'info', onClose }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            if (onClose) onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    const getIcon = () => {
        if (type === 'success') return '✨';
        if (type === 'error') return '⚠️';
        return 'ℹ️';
    };

    return (
        <div className={`toast-notification ${type}`}>
            {/* Progress Bar */}
            <div className="toast-progress-bar"></div>

            {/* Content */}
            <div className="toast-content-wrapper">
                {image ? (
                    <img src={image} alt="" className="toast-image"
                        onError={(e) => e.target.style.display = 'none'} />
                ) : (
                    <span className="toast-icon">{getIcon()}</span>
                )}
                <div className="toast-text">
                    <p className="toast-message">{message}</p>
                </div>
            </div>

            <button className="toast-close" onClick={onClose}>&times;</button>
        </div>
    );
}

export default Toast;