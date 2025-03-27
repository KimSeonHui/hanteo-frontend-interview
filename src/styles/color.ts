enum ColorKey {
  BLACK = 'black',
  WHITE = 'white',
  PINK = 'pink',
  GRAY_50 = 'gray_50',
  GRAY_100 = 'gray_100',
}

type Color = {
  [key in ColorKey]: string;
};

export const colors: Color = {
  [ColorKey.BLACK]: '#000',
  [ColorKey.WHITE]: '#fff',
  [ColorKey.PINK]: '#ffafc6',
  [ColorKey.GRAY_50]: '#f2f3f5',
  [ColorKey.GRAY_100]: '#6a7282',
};
