import { Mono_5x8 } from './fonts/mono_5x8';
import { Mono_5x7 } from './fonts/mono_5x7';
import { Mono_4x5 } from './fonts/mono_4x5';
import { Writer } from './writer';

const canvas = <HTMLCanvasElement>document.getElementById('canvas');
const context = canvas.getContext('2d')!;

const toHex = (str: string) => str.toUpperCase().split('').map(c => c.charCodeAt(0));

const writer_mono_5x8 = new Writer({
  context,
  font: Mono_5x8,
});
const writer_mono_5x7 = new Writer({
  context,
   font: Mono_5x7,
});
const writer_mono_4x5 = new Writer({
  context,
   font: Mono_4x5,
});


const fps = 30;

const parts = [
  `What is Lorem Ipsum?\n\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
  `Where does it come from?\n\nContrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`,
  `Why do we use it?\n\nIt is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).`,
  `Where can I get some?\n\nhere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.`,
];

writer_mono_5x8.write(toHex('Mono 5x8 pixels font:'), {
  area: { x: 10, y: 10, width: 280, height: 42 },
  padding: 16,
  color: 0xffffff,
  clear_background_color: 0x000000,
});
writer_mono_5x7.write(toHex('Mono 5x7 pixels font:'), {
  area: { x: 300, y: 10, width: 280, height: 42 },
  padding: 16,
  color: 0xffffff,
  clear_background_color: 0x000000,
});
writer_mono_4x5.write(toHex('Mono 4x5 pixels font:'), {
  area: { x: 590, y: 10, width: 280, height: 42 },
  padding: 16,
  color: 0xffffff,
  clear_background_color: 0x000000,
});

async function mono_5x8() {
  for (const part of parts) {
    await writer_mono_5x8.animate(toHex(part), {
      area: { x: 10, y: 40, width: 280, height: 420 },
      padding: 16,
      gap: 0,
      size: 1,
      color: 0xBBBBBB,
      clear_background_color: 0x000000,
    }, {
      fps,
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}

async function mono_5x7() {
  for (const part of parts) {
    await writer_mono_5x7.animate(toHex(part), {
      area: { x: 300, y: 40, width: 280, height: 420 },
      padding: 16,
      gap: 0,
      size: 1,
      color: 0xBBBBBB,
      clear_background_color: 0x000000,
    }, {
      fps,
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}

async function mono_4x5() {
  for (const part of parts) {
    await writer_mono_4x5.animate(toHex(part), {
      area: { x: 590, y: 40, width: 280, height: 420 },
      padding: 16,
      gap: 0,
      size: 1,
      color: 0xBBBBBB,
      clear_background_color: 0x000000,
    }, {
      fps,
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}

mono_5x8();
mono_5x7();
mono_4x5();