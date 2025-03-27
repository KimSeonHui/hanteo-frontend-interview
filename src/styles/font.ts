import { PretendardFontStyleKey, pretendard } from './fonts/pretendard/pretendard';

type FontStyleKey = PretendardFontStyleKey;

type FontStyle = {
  [key in FontStyleKey]: Record<string, string>;
};

export const fonts: FontStyle = {
  ...pretendard,
};
