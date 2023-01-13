export interface FontParams {
  name: string;
  ascii_table: Record<number, IFontGrid>;
  ascii_modifiers?: Record<number, { dy: number; dx: number }>;
  symbol_width: number;
  symbol_height: number;
  backup_symbol_grid: IFontGrid;
  new_line_symbol: number;
  separator_symbol: number;
  default_gap?: number;
  default_size?: number;
  default_inter_letter_width?: number;
  default_inter_letter_height?: number;
}

export const FontBlock = 1;
export const FontEmpty = 0;

export type IFontBlock = typeof FontBlock;
export type IFontEmpty = typeof FontEmpty;
export type IFontGrid = (IFontBlock | IFontEmpty)[][];

export class Font {
  name: string;
  ascii_table: Record<number, IFontGrid>;
  ascii_modifiers?: Record<number, { dy: number; dx: number }>;
  symbol_width: number;
  symbol_height: number;
  backup_symbol_grid: IFontGrid;
  new_line_symbol: number;
  separator_symbol: number;

  default_gap?: number;
  default_size?: number;
  default_inter_letter_width?: number;
  default_inter_letter_height?: number;

  constructor(params: FontParams) {
    const {
      name,
      ascii_table,
      ascii_modifiers,
      symbol_width,
      symbol_height,
      backup_symbol_grid,
      new_line_symbol,
      separator_symbol,
      default_size,
      default_gap,
      default_inter_letter_width,
      default_inter_letter_height,
    } = params;

    this.name = name;
    this.ascii_table = ascii_table;
    this.ascii_modifiers = ascii_modifiers;
    this.symbol_width = symbol_width;
    this.symbol_height = symbol_height;
    this.backup_symbol_grid = backup_symbol_grid;
    this.new_line_symbol = new_line_symbol;
    this.separator_symbol = separator_symbol;

    this.default_size = default_size;
    this.default_gap = default_gap;
    this.default_inter_letter_width = default_inter_letter_width;
    this.default_inter_letter_height = default_inter_letter_height;
  }
}