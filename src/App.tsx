import styled from 'styled-components';

function App() {
  return (
    <Layout>
      <h1>Hello World</h1>
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
