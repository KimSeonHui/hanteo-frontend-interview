import { useRef, useState } from 'react';
import styled from 'styled-components';

const TAB_LIST = [
  { id: 'chart', name: '차트' },
  { id: 'whook', name: 'Whook' },
  { id: 'event', name: '이벤트' },
  { id: 'news', name: '뉴스' },
  { id: 'store', name: '스토어' },
  { id: 'charge', name: '충전소' },
  { id: 'vote', name: '투표' },
];

interface Props {
  tab: string;
  setTab: (tab: string) => void;
}

const Tab = ({ tab, setTab }: Props) => {
  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const handleTabClick = (id: string) => {
    setTab(id);
    if (tabRefs.current[id]) {
      tabRefs.current[id].scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }
  };

  return (
    <StyledTab>
      {TAB_LIST.map((item) => (
        <TabItem
          key={item.id}
          ref={(tabRef) => {
            tabRefs.current[item.id] = tabRef;
          }}
          className={tab === item.id ? 'active' : ''}
          onClick={() => handleTabClick(item.id)}
        >
          {item.name}
        </TabItem>
      ))}
    </StyledTab>
  );
};

export default Tab;

const StyledTab = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 30px;
  padding: 15px 30px;
  background-color: ${({ theme }) => theme.colors.pink_50};
  overflow-x: auto;
  margin-bottom: 20px;

  &::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;
`;

const TabItem = styled.button`
  width: fit-content;
  color: ${({ theme }) => theme.colors.black};
  ${({ theme }) => theme.fonts.PRETENDARD_16_400};

  &.active {
    color: ${({ theme }) => theme.colors.white};
    font-weight: 600;
  }
`;
