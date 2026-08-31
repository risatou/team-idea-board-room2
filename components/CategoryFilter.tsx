import {
  noCategorySelected,
  type Category,
  type CategorySelection,
} from "@/types/idea";

type CategoryFilterProps = {
  categories: readonly Category[];
  activeCategory: CategorySelection;
  onChange: (category: CategorySelection) => void;
};

const selectId = "category-filter-select";

export function CategoryFilter({
  categories,
  activeCategory,
  onChange,
}: CategoryFilterProps) {
  const options = ["すべて", ...categories] as const;

  return (
    <div className="category-filter">
      <label htmlFor={selectId}>カテゴリで絞り込む</label>
      <select
        id={selectId}
        value={activeCategory}
        onChange={(event) =>
          onChange(event.target.value as CategorySelection)
        }
      >
        <option value={noCategorySelected}>カテゴリを選択してください</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
