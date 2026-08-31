export const categories = ["業務効率化", "顧客対応", "働き方"] as const;

export type Category = (typeof categories)[number];
export type CategoryFilterValue = "すべて" | Category;
/** カテゴリ未選択の状態を表す値 */
export const noCategorySelected = "" as const;
export type CategorySelection = typeof noCategorySelected | CategoryFilterValue;

export type Idea = {
  id: string;
  title: string;
  description: string;
  category: Category;
  author: string;
  votes: number;
};

export type IdeaDraft = Pick<Idea, "title" | "description" | "category">;
