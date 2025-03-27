import styled from 'styled-components';

function App() {
  return (
    <Layout>
      <Tab>
        <TabItem>차트</TabItem>
        <TabItem>Whook</TabItem>
        <TabItem>이벤트</TabItem>
        <TabItem>뉴스</TabItem>
        <TabItem>스토어</TabItem>
        <TabItem>충전소</TabItem>
        <TabItem>투표</TabItem>
      </Tab>
    </Layout>
  );
}

export default App;

const Layout = styled.div`
  width: 100%;
  height: 100%;
  max-width: 768px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
`;

const Tab = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 30px;
  padding: 15px 30px;
  background-color: ${({ theme }) => theme.colors.pink};
  overflow-x: auto;

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
    ${({ theme }) => theme.fonts.PRETENDARD_16_600};
  }
`;
