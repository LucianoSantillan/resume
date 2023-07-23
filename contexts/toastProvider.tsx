import SnackbarAlert from '@/components/SnackbarAlert/SnackbarAlert';
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
type Severity = 'error' | 'warning' | 'info' | 'success';

interface ToastState {
    open: boolean;
    message: string;
    severity: Severity
}

interface ToastContextData {
    openToast: (toast: Omit<ToastState, 'open'>) => void;
    closeToast: () => void;
    openUnexpectedErrorToast: () => void;
}

const ToastContext = createContext<ToastContextData | undefined>(undefined);

interface ToastProviderProps {
    children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
    const [toast, setToast] = useState<ToastState>({
        open: false,
        message: '',
        severity: 'success'
    });

    const openToast = useCallback(({ message, severity }: Omit<ToastState, 'open'>) => {
        setToast({ open: true, message, severity });
    }, []);

    const openUnexpectedErrorToast = useCallback(() => {
        setToast({ open: true, message: "Unexpected error has ocurred", severity: "error" });
    }, []);

    const closeToast = useCallback(() => {
        setToast(prev => ({ ...prev, open: false }));
    }, []);

    return (
        <ToastContext.Provider value={{ openToast, closeToast, openUnexpectedErrorToast }}>
            {children}
            <SnackbarAlert
                open={toast.open}
                onClose={closeToast}
                severity={toast.severity}
                message={toast.message}
            />
        </ToastContext.Provider>
    );
}

export function useToast(): ToastContextData {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }

    return context;
}
