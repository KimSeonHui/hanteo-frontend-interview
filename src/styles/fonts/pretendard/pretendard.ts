export enum PretendardFontStyleKey {
  PRETENDARD_12_400 = 'PRETENDARD_12_400',
  PRETENDARD_14_400 = 'PRETENDARD_14_400',
  PRETENDARD_16_400 = 'PRETENDARD_16_400',
  PRETENDARD_16_600 = 'PRETENDARD_16_600',
  PRETENDARD_18_600 = 'PRETENDARD_18_600',
}

type FontStyle = {
  [key in PretendardFontStyleKey]: Record<string, string>;
};

export const pretendard: FontStyle = {
  [PretendardFontStyleKey.PRETENDARD_12_400]: {
    fontFamily: 'pretendard',
    fontSize: '12px',
    fontWeight: '400',
    lineHeight: '16px',
  },
  [PretendardFontStyleKey.PRETENDARD_14_400]: {
    fontFamily: 'pretendard',
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '20px',
  },
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
  [PretendardFontStyleKey.PRETENDARD_18_600]: {
    fontFamily: 'pretendard',
    fontSize: '18px',
    fontWeight: '600',
    lineHeight: '24px',
  },
};
