import {
  openExpandedSearch,
  closeExpandedSearch,
  $isExpandedSearchOpen,
} from './index';

$isExpandedSearchOpen
  .on(openExpandedSearch, () => true)
  .reset(closeExpandedSearch);
