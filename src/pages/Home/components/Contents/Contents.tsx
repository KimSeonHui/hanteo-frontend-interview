import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { getChart } from '@api/chart';
import { Chart } from '@type';

const Contents = () => {
  const [chart, setChart] = useState<Chart[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastContentRef = useRef<HTMLDivElement>(null);

  const loadChart = useCallback(async () => {
    if (isLoading || !hasMore) {
      return;
    }

    setIsLoading(true);

    const PAGE_SIZE = 10;
    const response = await getChart().then((data) => data.chart);
    const startIndex = (page - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;

    const newChart = response.slice(startIndex, endIndex);

    if (newChart.length === 0) {
      setHasMore(false);
      return;
    }

    setPage((prev) => prev + 1);
    setChart((prev) => [...prev, ...newChart]);
    setIsLoading(false);
  }, [page]);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadChart();
        }
      },
      {
        threshold: 0.5,
      },
    );

    if (lastContentRef.current) {
      observer.current.observe(lastContentRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [page]);

  return (
    <>
      <StyledContents>
        {chart.map((item) => (
          <Content key={item.id}>
            <ContentLeft>
              <ContentImage src={item.thumbnail} alt="content" />
              <ContentRank>{item.rank}</ContentRank>
              <ContentTextWrapper>
                <ContentTitle>{item.title}</ContentTitle>
                <ContentText>{item.artist}</ContentText>
              </ContentTextWrapper>
            </ContentLeft>
            <ContentRight>
              <img src="/public/images/svg/favorite.svg" alt="favorite" />
              <ContentText>{item.favorite}</ContentText>
            </ContentRight>
          </Content>
        ))}
      </StyledContents>
      <LastContent ref={lastContentRef} />
    </>
  );
};

export default Contents;

const StyledContents = styled.div`
  width: 100%;
  padding: 0 20px;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 60px;
  }
`;

const ContentLeft = styled.div`
  display: flex;
  gap: 10px;
`;

const ContentImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
`;

const ContentRank = styled.p`
  ${({ theme }) => theme.fonts.PRETENDARD_18_600};
`;

const ContentTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentTitle = styled.p`
  ${({ theme }) => theme.fonts.PRETENDARD_16_600};
  color: ${({ theme }) => theme.colors.black};
`;

const ContentText = styled.p`
  ${({ theme }) => theme.fonts.PRETENDARD_14_400};
  color: ${({ theme }) => theme.colors.gray_200};
`;

const ContentRight = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const LastContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
`;
