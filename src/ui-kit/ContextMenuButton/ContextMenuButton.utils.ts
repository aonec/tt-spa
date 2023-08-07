import {
  ContextMenuButtonColor,
  ContextMenuButtonColorsLookup,
} from './ContextMenuButton.types';

export function getButtonColor(color?: ContextMenuButtonColor) {
  if (!color) return ContextMenuButtonColorsLookup.primary;

  return ContextMenuButtonColorsLookup[color];
}
