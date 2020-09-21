import { css } from "reshadow/macro"

export const styles = css`
  comments {
    display: grid;
    grid-gap: 16px;
    font-size: 14px;
  }

  editor {
    display: grid;
    grid-gap: 16px;
    grid-template-columns: auto 1fr;

    & > *:last-child {
      grid-column: 2;
      justify-self: start;
    }
  }

  comment {
    display: grid;
    grid-column-gap: 16px;
    grid-row-gap: 8px;
    grid-template-columns: auto auto 1fr auto;
    align-content: start;
    grid-template-areas:
      "ava name time ."
      "ava text text text";

    & p {
      grid-area: text;
    }

    & p {
      margin: 0;
      padding: 0;
    }
    & Avatar {
      grid-area: ava;
    }
  }

  author,
  time {
    font-size: 12px;
  }

  author {
    grid-area: name;
    opacity: 0.6;
  }

  time {
    grid-area: time;
    opacity: 0.32;
  }

  btns {
    display: flex;
    & > button {
      padding: 4px;
      color: inherit;
    }

    & > :first-child:hover {
      color: rgba(var(--primary));
    }

    & > :last-child:hover {
      color: rgba(var(--error));
    }
  }

  comment_edit {
    grid-area: text;
    display: grid;
    grid-gap: 8px;
    grid-template-columns: auto auto 1fr;
    justify-content: start;
    & textarea {
      grid-column: 1 / -1;
    }
  }
`
