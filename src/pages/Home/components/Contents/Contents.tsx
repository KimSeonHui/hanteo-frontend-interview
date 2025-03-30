import styled from 'styled-components';
import Chart from './Chart/Chart';
import Event from './Event/Event';
import NoContent from './NoContent/NoContent';

interface Props {
  tab: string;
}

const Contents = ({ tab }: Props) => {
  const renderContent = () => {
    switch (tab) {
      case 'chart':
        return <Chart />;
      case 'event':
        return <Event />;
      default:
        return <NoContent />;
    }
  };

  return <StyledContents>{renderContent()}</StyledContents>;
};

export default Contents;

const StyledContents = styled.div`
  width: 100%;
  min-height: 680px;
  padding: 0 20px;
`;
