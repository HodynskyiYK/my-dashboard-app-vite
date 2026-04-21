import type { ReactNode } from "react";

import styles from "./ListItemWithActions.module.css";

export function ListItemWithActions({ item, actions }: { item: ReactNode, actions: ReactNode }) {
  return (
      <div className={styles.listItem}>
          <div className={styles.item}>{item}</div>
          <div className={styles.actions}>{actions}</div>
      </div>
  );
}
