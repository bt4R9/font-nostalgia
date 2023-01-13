export class Text {
  private raw_data: Entity[];

  private code_separator = 0x20;
  private code_new_line = 0xA;

  constructor(rawText: string) {
    this.raw_data = this.parse(rawText);
  }

  get data() {
    return this.raw_data;
  }

  private toHex(rawText: string) {
    return rawText.toUpperCase().split('').map(c => c.charCodeAt(0));
  }

  private parse(rawText: string) {
    const chars = this.toHex(rawText);
    const entities: Entity[] = [];
    const buffer: number[] = [];

    const maybePushCharsEntity = () => {
      if (buffer.length > 0) {
        entities.push(new Entity({
          type: 'chars',
          chars: buffer.slice(),
        }));

        buffer.length = 0;
      }
    }

    for (let i = 0; i < chars.length + 1; i++) {
      if (i === chars.length) {
        maybePushCharsEntity();
      } else if (chars[i] === this.code_separator) {
        maybePushCharsEntity();
        entities.push(new Entity({ type: 'separator' }));
      } else if (chars[i] === this.code_new_line) {
        maybePushCharsEntity();
        entities.push(new Entity({ type: 'new_line' }));
      } else {
        buffer.push(chars[i]);
      }
    }

    return entities;
  }
}

export interface EntityParams {
  type: 'chars' | 'separator' | 'new_line';
  chars?: number[];
}

class Entity {
  type: EntityParams['type'];
  chars: number[];

  constructor(params: EntityParams) {
    const { type, chars } = params;

    this.type = type;
    this.chars = chars ?? [];
  }
}