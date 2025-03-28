enum ColorKey {
  BLACK = 'black',
  WHITE = 'white',
  PINK_50 = 'pink_50',
  PINK_100 = 'pink_100',
  GRAY_50 = 'gray_50',
  GRAY_100 = 'gray_100',
  GRAY_200 = 'gray_200',
}

type Color = {
  [key in ColorKey]: string;
};

export const colors: Color = {
  [ColorKey.BLACK]: '#000',
  [ColorKey.WHITE]: '#fff',
  [ColorKey.PINK_50]: '#ffafc6',
  [ColorKey.PINK_100]: '#ff346f',
  [ColorKey.GRAY_50]: '#f2f3f5',
  [ColorKey.GRAY_100]: '#86888b',
  [ColorKey.GRAY_200]: '#6a7282',
};
