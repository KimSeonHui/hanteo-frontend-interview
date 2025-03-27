export enum PretendardFontStyleKey {
  PRETENDARD_16_400 = 'PRETENDARD_16_400',
  PRETENDARD_16_600 = 'PRETENDARD_16_600',
}

type FontStyle = {
  [key in PretendardFontStyleKey]: Record<string, string>;
};

export const pretendard: FontStyle = {
  [PretendardFontStyleKey.PRETENDARD_16_400]: {
    fontFamily: 'pretendard',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '24px',
  },
  [PretendardFontStyleKey.PRETENDARD_16_600]: {
    fontFamily: 'pretendard',
    fontSize: '16px',
    fontWeight: '600',
    lineHeight: '24px',
  },
};
