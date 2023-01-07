import { ASCIITable_4x5, ASCIITable_4x5_modifiers } from './ascii_4x5';
import { Font } from '../../font';

export const Mono_4x5 = new Font({
  name: 'Mono_4x5',
  ascii_table: ASCIITable_4x5,
  ascii_modifiers: ASCIITable_4x5_modifiers,
  symbol_width: 4,
  symbol_height: 5,
  backup_symbol_grid: [
    [1,1,1,1],
    [1,1,1,1],
    [1,1,1,1],
    [1,1,1,1],
    [1,1,1,1],
  ],
  new_line_symbol: 0xA,
  separator_symbol: 0x20,
  default_inter_letter_width: 1,
  default_inter_letter_height: 4,
  default_gap: 0,
  default_size: 1,
});