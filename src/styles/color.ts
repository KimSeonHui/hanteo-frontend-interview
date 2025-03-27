enum ColorKey {
  BLACK = 'black',
  WHITE = 'white',
  PINK = 'pink',
  GRAY = 'gray',
}

type Color = {
  [key in ColorKey]: string;
};

export const colors: Color = {
  [ColorKey.BLACK]: '#000',
  [ColorKey.WHITE]: '#fff',
  [ColorKey.PINK]: '#ffafc6',
  [ColorKey.GRAY]: '#f2f3f5',
};
