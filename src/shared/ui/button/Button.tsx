import styles from "./Button.module.css";

interface ButtonProps {
    children: React.ReactNode;
    type: "primary" | "secondary" | "danger";
    onClick?: () => void;
    disabled?: boolean;
}

export function Button({ children, onClick, disabled, type }: ButtonProps) {
    return (
        <button
            className={`${styles.btn} ${styles[`btn-${type}`]}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};
