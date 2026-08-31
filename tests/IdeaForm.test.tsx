import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { IdeaForm } from "@/components/IdeaForm";

describe("Ticket C: アイデア追加フォーム", () => {
  it("有効な入力を送信するとonAddへ入力内容を渡す", async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    render(<IdeaForm onAdd={onAdd} />);

    await user.type(screen.getByLabelText("タイトル"), "朝会の議事録を自動でまとめたい");
    await user.selectOptions(screen.getByLabelText("カテゴリ"), "顧客対応");
    await user.type(
      screen.getByLabelText("背景・困りごと"),
      "毎回手作業でまとめていて時間がかかっています。",
    );
    await user.click(screen.getByRole("button", { name: "アイデアを追加" }));

    expect(onAdd).toHaveBeenCalledWith({
      title: "朝会の議事録を自動でまとめたい",
      category: "顧客対応",
      description: "毎回手作業でまとめていて時間がかかっています。",
    });
  });

  it("タイトルが3文字未満の場合は理由を表示して追加しない", async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    render(<IdeaForm onAdd={onAdd} />);

    await user.type(screen.getByLabelText("タイトル"), "AB");
    await user.click(screen.getByRole("button", { name: "アイデアを追加" }));

    expect(onAdd).not.toHaveBeenCalled();
    expect(screen.getByRole("alert").textContent).toContain("3文字以上");
  });

  it("タイトルの残り文字数を表示する", async () => {
    const user = userEvent.setup();
    render(<IdeaForm onAdd={vi.fn()} />);

    await user.type(screen.getByLabelText("タイトル"), "検討");

    expect(screen.getByText("残り38文字")).toBeTruthy();
  });

  it("追加後は入力内容が空になる", async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    render(<IdeaForm onAdd={onAdd} />);

    const titleInput = screen.getByLabelText("タイトル") as HTMLInputElement;
    const descriptionInput = screen.getByLabelText("背景・困りごと") as HTMLTextAreaElement;
    await user.type(titleInput, "テスト用のアイデアタイトル");
    await user.type(descriptionInput, "テスト用の説明文です。");
    await user.click(screen.getByRole("button", { name: "アイデアを追加" }));

    expect(titleInput.value).toBe("");
    expect(descriptionInput.value).toBe("");
  });
});
