import styles from "./Button.module.css";

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
}

export function Button({ children, onClick, disabled }: ButtonProps) {
    return (
        <button
            className={styles.btn}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};
