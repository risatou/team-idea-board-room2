"use client";

import { useId, useState, type FormEvent } from "react";
import { categories, type Category, type IdeaDraft } from "@/types/idea";

type IdeaFormProps = {
  onAdd: (idea: IdeaDraft) => void;
};

const TITLE_MIN_LENGTH = 3;
const TITLE_MAX_LENGTH = 40;

export function IdeaForm({ onAdd }: IdeaFormProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<Category>(categories[0]);
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const titleFieldId = useId();
  const categoryFieldId = useId();
  const descriptionFieldId = useId();
  const errorId = useId();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = title.trim();
    if (trimmedTitle.length < TITLE_MIN_LENGTH) {
      setError(`タイトルは${TITLE_MIN_LENGTH}文字以上で入力してください`);
      return;
    }
    if (trimmedTitle.length > TITLE_MAX_LENGTH) {
      setError(`タイトルは${TITLE_MAX_LENGTH}文字以内で入力してください`);
      return;
    }

    onAdd({ title: trimmedTitle, category, description: description.trim() });

    setTitle("");
    setCategory(categories[0]);
    setDescription("");
    setError("");
  };

  const remainingTitleLength = TITLE_MAX_LENGTH - title.length;

  return (
    <form className="idea-form" onSubmit={handleSubmit} noValidate>
      <h2>アイデアを追加</h2>

      <div className="field">
        <label htmlFor={titleFieldId}>タイトル</label>
        <input
          id={titleFieldId}
          type="text"
          value={title}
          maxLength={TITLE_MAX_LENGTH}
          onChange={(event) => {
            setTitle(event.target.value);
            setError("");
          }}
          aria-describedby={error ? errorId : undefined}
          aria-invalid={error ? true : undefined}
        />
        <span className="char-count">残り{remainingTitleLength}文字</span>
      </div>

      <div className="field">
        <label htmlFor={categoryFieldId}>カテゴリ</label>
        <select
          id={categoryFieldId}
          value={category}
          onChange={(event) => setCategory(event.target.value as Category)}
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor={descriptionFieldId}>背景・困りごと</label>
        <textarea
          id={descriptionFieldId}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>

      {error ? (
        <p className="form-error" id={errorId} role="alert">
          {error}
        </p>
      ) : null}

      <button type="submit">アイデアを追加</button>
    </form>
  );
}
