import type { Ref } from "vue";

export interface IInputMethods {
  inputRef: Ref<HTMLInputElement | null>;
  onChange: ($event: Event) => void;
  onClick: () => void;
  handleDrop: (event: DragEvent) => void;
  handleDragOver: (event: DragEvent) => void;
  handleDragEnter: (event: DragEvent) => void;
  handleDragLeave: (event: DragEvent) => void;
}
