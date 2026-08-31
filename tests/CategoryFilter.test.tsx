import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { CategoryFilter } from "@/components/CategoryFilter";
import { categories } from "@/types/idea";

describe("Ticket B: カテゴリ絞り込み", () => {
  it("未選択・すべて・各カテゴリをリストから選べる", () => {
    render(
      <CategoryFilter
        categories={categories}
        activeCategory=""
        onChange={() => {}}
      />,
    );

    const select = screen.getByRole("combobox", { name: "カテゴリで絞り込む" });
    const optionLabels = Array.from(
      select.querySelectorAll("option"),
    ).map((option) => option.textContent);

    expect(optionLabels).toEqual([
      "カテゴリを選択してください",
      "すべて",
      ...categories,
    ]);
  });

  it("初期状態では未選択の項目が選ばれている", () => {
    render(
      <CategoryFilter
        categories={categories}
        activeCategory=""
        onChange={() => {}}
      />,
    );

    const select = screen.getByRole<HTMLSelectElement>("combobox", {
      name: "カテゴリで絞り込む",
    });

    expect(select.value).toBe("");
  });

  it("カテゴリを選ぶとonChangeへ選択値を渡す", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <CategoryFilter
        categories={categories}
        activeCategory=""
        onChange={onChange}
      />,
    );

    await user.selectOptions(
      screen.getByRole("combobox", { name: "カテゴリで絞り込む" }),
      "顧客対応",
    );

    expect(onChange).toHaveBeenCalledWith("顧客対応");
  });

  it("選択中のカテゴリがリストに反映される", () => {
    render(
      <CategoryFilter
        categories={categories}
        activeCategory="働き方"
        onChange={() => {}}
      />,
    );

    const select = screen.getByRole<HTMLSelectElement>("combobox", {
      name: "カテゴリで絞り込む",
    });

    expect(select.value).toBe("働き方");
  });
});
