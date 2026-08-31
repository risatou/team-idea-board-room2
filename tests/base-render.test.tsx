import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { IdeaBoard } from "@/components/IdeaBoard";

describe("スターターアプリ", () => {
  it("初期状態ではカテゴリ未選択で、アイデア一覧を表示しない", () => {
    render(<IdeaBoard />);

    expect(screen.getByText("表示するカテゴリを選んでください")).toBeTruthy();
    expect(screen.queryByText("会議メモを同じ形式で残したい")).toBeNull();
    expect(screen.queryByText("問い合わせの引き継ぎ漏れを減らしたい")).toBeNull();
    expect(screen.queryByText("集中時間をチームで共有したい")).toBeNull();
    expect(screen.queryByText(/Ticket [A-D]/)).toBeNull();
  });

  it("カテゴリを選ぶと、そのカテゴリのアイデアと現在の票数を表示する", async () => {
    const user = userEvent.setup();
    render(<IdeaBoard />);

    await user.selectOptions(
      screen.getByRole("combobox", { name: "カテゴリで絞り込む" }),
      "顧客対応",
    );

    expect(screen.getByText("問い合わせの引き継ぎ漏れを減らしたい")).toBeTruthy();
    expect(
      screen.getByLabelText("問い合わせの引き継ぎ漏れを減らしたいの投票数は12票です"),
    ).toBeTruthy();
    expect(screen.queryByText("会議メモを同じ形式で残したい")).toBeNull();
    expect(screen.queryByText("集中時間をチームで共有したい")).toBeNull();
  });

  it("すべてを選ぶと、初期アイデア3件を表示する", async () => {
    const user = userEvent.setup();
    render(<IdeaBoard />);

    await user.selectOptions(
      screen.getByRole("combobox", { name: "カテゴリで絞り込む" }),
      "すべて",
    );

    expect(screen.getByText("会議メモを同じ形式で残したい")).toBeTruthy();
    expect(screen.getByText("問い合わせの引き継ぎ漏れを減らしたい")).toBeTruthy();
    expect(screen.getByText("集中時間をチームで共有したい")).toBeTruthy();
  });
});
