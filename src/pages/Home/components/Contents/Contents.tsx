import styled from 'styled-components';
import Chart from './Chart/Chart';
import Event from './Event/Event';
interface Props {
  tab: string;
}

const Contents = ({ tab }: Props) => {
  return (
    <>
      <StyledContents>
        {tab === 'chart' && <Chart />}
        {tab === 'event' && <Event />}
      </StyledContents>
    </>
  );
};

export default Contents;

const StyledContents = styled.div`
  width: 100%;
  min-height: 680px;
  padding: 0 20px;
`;
