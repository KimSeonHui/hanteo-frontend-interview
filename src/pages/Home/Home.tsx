import styled from 'styled-components';
import Tab from './components/Tab/Tab';
import Banner from './components/Banner/Banner';
import Contents from './components/Contents/Contents';

const Home = () => {
  return (
    <Layout>
      <Tab />
      <Banner />
      <Contents />
    </Layout>
  );
};

export default Home;

const Layout = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 768px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
`;
