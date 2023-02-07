export type CommentPanelProps = {
  oldCommentText: string | null;
  author?: string;
  commentDate?: string;
  onEdit: (comment: string) => void;
  onRemove: () => void;
};
