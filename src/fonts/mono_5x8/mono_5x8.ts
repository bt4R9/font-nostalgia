import { ASCIITable_5x8, ASCIITable_5x8_modifiers } from './ascii_5x8';
import { Font } from '../../font';

export const Mono_5x8 = new Font({
  name: 'Mono_5x8',
  ascii_table: ASCIITable_5x8,
  ascii_modifiers: ASCIITable_5x8_modifiers,
  symbol_width: 5,
  symbol_height: 8,
  backup_symbol_grid: [
    [1,1,1,1,1],
    [1,1,1,1,1],
    [1,1,1,1,1],
    [1,1,1,1,1],
    [1,1,1,1,1],
    [1,1,1,1,1],
    [1,1,1,1,1],
    [1,1,1,1,1], 
  ],
  new_line_symbol: 0xA,
  separator_symbol: 0x20,
  default_inter_letter_width: 2,
  default_inter_letter_height: 6,
  default_gap: 0,
  default_size: 1,
});