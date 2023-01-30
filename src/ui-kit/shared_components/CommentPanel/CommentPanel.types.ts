export type CommentPanelProps = {
  comment: string | null;
  author: string;
  commentDate: string;
  onEdit: (comment: string) => void;
  onRemove: () => void;
};
