import { Button } from "@/shared/ui/button";

import styles from "./Pagination.module.css";

interface IPaginationProps {
  page: number;
  hasNext: boolean;
  onChange: (page: number) => void;
}

export function Pagination({ page, hasNext, onChange }: IPaginationProps) {

  return (
    <div className={styles.pagination}>
      <Button
        type="secondary"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
      >
        Previous
      </Button>
      <span className="pagination-info">Page: {page}</span>
      <Button
        type="secondary"
        onClick={() => onChange(page + 1)}
        disabled={!hasNext}
      >
        Next
      </Button>
    </div>
  )
}