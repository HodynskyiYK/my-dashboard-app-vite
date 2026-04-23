import type { SetURLSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./SearchDashboardForm.module.css";
import { useDebounce } from "@/shared/hooks";

interface ISearchDashboardFormProps {
  searchValue: string;
  setSearch: SetURLSearchParams;
  currentPage: number;
}

export function SearchDashboardForm({ searchValue, setSearch, currentPage }: ISearchDashboardFormProps) {
  const [inputValue, setInputValue] = useState(searchValue);
  const debouncedSearch = useDebounce(inputValue, 500);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }

  useEffect(() => {
    setSearch({
      search: debouncedSearch,
      page: currentPage.toString(),
    }, { replace: true });
  }, [debouncedSearch, setSearch]);

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
    >
      <div>
          <input
            placeholder="Search by dashboard title"
            className={`${styles.input}`}
            value={inputValue}
            onChange={handleInputChange}
          />
          <p className={styles.error}>{}</p>
        </div>
    </form>
  );
}
