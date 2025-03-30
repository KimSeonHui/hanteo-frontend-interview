import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import type { Chart } from '@type';
import { getChart } from '@api/chart';
import useInfiniteScrollObserver from '../hooks/useInfiniteScrollObserver';

const PAGE_SIZE = 10;

const Chart = () => {
  const [chart, setChart] = useState<Chart[]>([]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['chart'],
    queryFn: ({ pageParam }) => getChart(pageParam, PAGE_SIZE),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.chart.length > 0 ? allPages.length + 1 : undefined;
    },
    staleTime: 1000 * 60 * 5,
    maxPages: 10,
  });

  const { lastContentRef } = useInfiniteScrollObserver(
    useCallback(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach(async (entry) => {
          if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        });
      },
      [hasNextPage, isFetchingNextPage, fetchNextPage],
    ),
    {
      threshold: 0.8,
    },
  );

  useEffect(() => {
    if (data) {
      const newChart = data.pages.flatMap((page) => page.chart);
      setChart(newChart);
    }
  }, [data]);

  return (
    <>
      {chart.map((item) => (
        <Content key={item.id}>
          <ContentLeft>
            <picture>
              <source srcSet={`${item.thumbnail}.webp`} type="image/webp" />
              <source srcSet={`${item.thumbnail}.jpg`} type="image/jpeg" />
              <ContentImage src={`${item.thumbnail}.jpg`} alt="content" width={50} height={50} />
            </picture>
            <ContentRank>{item.rank}</ContentRank>
            <ContentTextWrapper>
              <ContentTitle>{item.title}</ContentTitle>
              <ContentText>{item.artist}</ContentText>
            </ContentTextWrapper>
          </ContentLeft>
          <ContentRight>
            <img src="/public/images/svg/favorite.svg" alt="favorite" />
            <ContentText>{item.favorite ? item.favorite.toLocaleString() : '0'}</ContentText>
          </ContentRight>
        </Content>
      ))}
      {(isFetchingNextPage || chart.length === 0) &&
        Array.from({ length: 10 }).map((_, index) => (
          <Content key={index}>
            <ContentLeft>
              <SkeletonImage />
              <ContentTextWrapper>
                <SkeletonText />
                <SkeletonText className="short" />
              </ContentTextWrapper>
            </ContentLeft>
          </Content>
        ))}
      <LastContent ref={lastContentRef} />
    </>
  );
};

export default Chart;

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

const skeletonGradient = keyframes`
  0% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 0.3;
  }
`;

const SkeletonImage = styled.div`
  width: 50px;
  height: 50px;
  background-color: ${({ theme }) => theme.colors.gray_100};
  animation: ${skeletonGradient} 2.5s infinite;
  border-radius: 10px;
  border: none;
`;

const SkeletonText = styled(ContentText)`
  width: 100px;
  height: 10px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.gray_100};
  animation: ${skeletonGradient} 2.5s infinite;
  margin-bottom: 10px;

  &.short {
    width: 30px;
  }
`;
