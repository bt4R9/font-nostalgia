import { Writer, Mono_5x7 } from './src';

const canvas = <HTMLCanvasElement>document.getElementById('canvas');
const context = canvas.getContext('2d')!;

const writer = new Writer({ context, font: Mono_5x7 });

writer.animate('Hello, how are you?\nWhat do you want?\nYo?', {
  area: { y: 10, x: 10, width: 100, height: 140 },
  gap: 0,
  size: 1,
  padding: 10,
  color: 0xbf00cb,
  clear_background_color: 0xdddccc
}, {
  fps: 10
});