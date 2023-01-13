import { Color } from "./utils/color";
import type { Font, IFontGrid } from "./font";
import { FontBlock } from "./font";
import { Text } from './text';
import { toHexString } from "./utils/hex";

export interface WriterParams {
  context: CanvasRenderingContext2D;
  font: Font;
}

export interface AreaParams {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface WriteParams {
  area: AreaParams;
  size?: number;
  gap?: number;
  color?: number;
  clear_background_color?: number;
  padding?: number;
  inter_letter_width?: number;
  inter_letter_height?: number;
  word_break?: boolean;
}

export interface WriteSymbolParams {
  size: number;
  color: Color; 
  x: number;
  y: number;
  gap: number;
}

export class Writer {
  private context: CanvasRenderingContext2D;
  private font: Font;

  constructor(params: WriterParams) {
    this.context = params.context;
    this.font = params.font;
  }

  private clear(color: number | undefined, area: AreaParams): void {
    if (typeof color !== 'number') {
      return;
    }

    const { context } = this;
    const fillColor = new Color(color);

    context.fillStyle = fillColor.hex_string;
    context.fillRect(area.x, area.y, area.width, area.height);
  }

  private * _write(rawText: string, {
    area,
    size: _size,
    gap: _gap,
    color = 0x000000,
    clear_background_color,
    padding = 0,
    inter_letter_height: _inter_letter_height,
    inter_letter_width: _inter_letter_width,
    word_break = true
  }: WriteParams) {
    const text = new Text(rawText);

    this.clear(clear_background_color, area);

    const { font } = this;    

    const size = _size ?? font.default_size ?? 1;
    const gap = _gap ?? font.default_gap ?? 0;
    const inter_letter_width = _inter_letter_width ?? font.default_inter_letter_width ?? 0;
    const inter_letter_height = _inter_letter_height ?? font.default_inter_letter_height ?? 0;

    const start_x = area.x + padding;
    const start_y = area.y + padding;
    const end_x = area.x + area.width - padding;
    const end_y = area.y + area.height - padding;

    let dy = start_y;
    let dx = start_x;

    const final_symbol_width = font.symbol_width * (size + gap);
    const final_symbol_height = font.symbol_height * (size + gap);

    const offset_x = font.symbol_width * (size + gap) + inter_letter_width;
    const offset_y = font.symbol_height * (size + gap) + inter_letter_height;

    const fontColor = new Color(color);

    for (const entity of text.data) {
      if (entity.type === 'new_line') {
        dx = start_x;
        dy += offset_y;
        continue;
      }

      if (entity.type === 'chars') {
        const entity_width = entity.chars.length * final_symbol_width + (inter_letter_width * entity.chars.length - 1);
        const in_area_x = dx + entity_width < end_x;

        if (!in_area_x) {
          if (!word_break) {
            console.warn(`The text is too long.`);
            break;
          }

          dx = start_x;
          dy += offset_y;
        }

        const in_area_y = dy + final_symbol_height < end_y;

        if (!in_area_y) {
          console.warn(`Not enough space in the area to insert a group [${entity.chars.map(toHexString)}].`);
          break;
        }

        for (const symbol of entity.chars) {
          yield this.writeSymbol(symbol, {
            x: dx,
            y: dy,
            color: fontColor,
            size,
            gap,
          });

          dx += offset_x;
        }

        yield this.writeSymbol(font.separator_symbol, {
          x: dx,
          y: dy,
          color: fontColor,
          size,
          gap,
        });

        dx += offset_x;
      }
    }
  }

  private writeSymbol(symbol: number, params: WriteSymbolParams): void {
    const { context, font } = this;

    let grid: IFontGrid = font.ascii_table[symbol];

    if (symbol in font.ascii_table === false) {
      console.warn(`Symbol [${toHexString(symbol)}] is not supported in the "${font.name}" font.`);
      grid = font.backup_symbol_grid;
    }

    const { ascii_modifiers, symbol_width, symbol_height } = font;

    const {
      size,
      gap,
      color,
      x: start_x,
      y: start_y,
    } = params;

    const modifier_x = ascii_modifiers?.[symbol]?.dx ?? 0;
    const modifier_y = ascii_modifiers?.[symbol]?.dy ?? 0;

    context.fillStyle = color.hex_string;

    for (let y = 0; y < symbol_height; y++) {
      const dy = start_y + (modifier_y * (size + gap)) + y * (size + gap);

      for (let x = 0; x < symbol_width; x++) {
        const dx = start_x + (modifier_x * (size + gap)) + x * (size + gap);

        if (grid[y][x] === FontBlock) {
          context.fillRect(dx, dy, size, size);
        }
      }
    }
  }

  animate(text: string, params: WriteParams, { fps = 60 }: { fps?: number } = {}) {
    return new Promise<void>((resolve) => {
      const generator = this._write(text, params);
      const speed = 1000 / fps;

      let frameId = -1;
      let timestamp = -1;

      const animate = async () => {
        frameId = requestAnimationFrame(animate);

        const now = Date.now();
        const elapsed = now - timestamp;

        if (elapsed < speed) {
          return;
        }

        timestamp = now - (elapsed % speed);

        const next = generator.next();

        if (next.done) {
          cancelAnimationFrame(frameId);
          resolve();
        }
      }

      requestAnimationFrame(animate);
    });
  }

  write(text: string, params: WriteParams) {
    const iterator = this._write(text, params);

    while (iterator.next) {
      const next = iterator.next();

      if (next.done) {
        break;
      }
    }
  }
}