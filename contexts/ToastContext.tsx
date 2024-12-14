import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { Text, StyleSheet, Animated } from "react-native";

interface ToastContextType {
    showToast: (message: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

interface ToastProviderProps {
    children: ReactNode;
}

// Toast Provider component
export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
    const [toast, setToast] = useState<string | null>(null);
    const [opacity] = useState(new Animated.Value(0));

    const showToast = useCallback((message: string, duration: number = 3000) => {
        setToast(message);
        Animated.timing(opacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            setTimeout(() => {
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }).start(() => setToast(null));
            }, duration);
        });
    }, [opacity]);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {toast && (
                <Animated.View style={[styles.toastContainer, { opacity }]}>
                    <Text style={styles.toastText}>{toast}</Text>
                </Animated.View>
            )}
        </ToastContext.Provider>
    );
};

export const useToast = (): ((message: string, duration?: number) => void) => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context.showToast;
};

// Styles
const styles = StyleSheet.create({
    toastContainer: {
        position: "absolute",
        bottom: 50,
        left: 20,
        right: 20,
        backgroundColor: "#333",
        padding: 10,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        elevation: 5,
    },
    toastText: {
        color: "#fff",
        fontSize: 16,
    },
});
