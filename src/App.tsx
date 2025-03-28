import { useState, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import type { Banner, BannerStatus, BannerType, Chart } from '@type';
import { getBanners } from '@api/banner';

import 'swiper/css';
import 'swiper/css/pagination';
import { getChart } from '@api/chart';

const TAB_LIST = [
  { id: 'chart', name: '차트' },
  { id: 'whook', name: 'Whook' },
  { id: 'event', name: '이벤트' },
  { id: 'news', name: '뉴스' },
  { id: 'store', name: '스토어' },
  { id: 'charge', name: '충전소' },
  { id: 'vote', name: '투표' },
];

function App() {
  const [tab, setTab] = useState('chart');
  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const [banners, setBanners] = useState<Banner[]>([]);

  const [chart, setChart] = useState<Chart[]>([]);
  const [page, setPage] = useState(1);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastContentRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

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

  const handleBannerClick = (url: string) => {
    window.open(url, '_blank');
  };

  const getBannerButtonText = (type: BannerType) => {
    switch (type) {
      case 'vote':
        return '투표하기';
      default:
        return '신청하기';
    }
  };

  const getBannerStatusLabel = (status: BannerStatus) => {
    switch (status) {
      case 'ongoing':
        return '진행중';
      case 'upcoming':
        return '예정';
      case 'ended':
        return '종료';
    }
  };

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
    getBanners().then((data) => {
      setBanners(data.banners);
    });
  }, []);

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
    <Layout>
      <Tab>
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
      </Tab>
      {banners.length > 0 && (
        <StyledSwiper
          spaceBetween={5}
          slidesPerView={1.1}
          centeredSlides={true}
          loop
          pagination
          modules={[Pagination, Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
        >
          {banners.map((banner) => (
            <StyledSwiperSlide key={banner.id} onClick={() => handleBannerClick(banner.url)}>
              <Banner>
                <BannerStatusLabel className={banner.status}>{getBannerStatusLabel(banner.status)}</BannerStatusLabel>
                <BannerImage src={banner.thumbnail} alt="banner" />
                <BannerContent>
                  <BannerTitleRow>
                    <BannerTitle>{banner.title}</BannerTitle>
                    <BannerButton>{getBannerButtonText(banner.type)}</BannerButton>
                  </BannerTitleRow>
                  <BannerDate>
                    {banner.startDate} ~ {banner.endDate}(KST)
                  </BannerDate>
                </BannerContent>
              </Banner>
            </StyledSwiperSlide>
          ))}
        </StyledSwiper>
      )}
      <Contents>
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
      </Contents>
      <LastContent ref={lastContentRef} />
    </Layout>
  );
}

export default App;

const Layout = styled.div`
  position: relative;
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

const StyledSwiper = styled(Swiper)`
  padding-bottom: 40px;

  .swiper-pagination-horizontal {
    bottom: 20px;
  }

  .swiper-pagination-bullet-active {
    background-color: ${({ theme }) => theme.colors.pink_100};
  }
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  width: calc(100% - 20px);
`;

const Banner = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  border-radius: 10px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray_50};
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
`;

const BannerImage = styled.img`
  width: 100%;
  height: 130px;
  object-fit: cover;
  margin-bottom: 5px;
`;

const BannerContent = styled.div`
  width: 100%;
  padding: 0 10px;
`;

const BannerTitleRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const BannerTitle = styled.p`
  width: 100%;
  max-width: 70%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ${({ theme }) => theme.fonts.PRETENDARD_14_400};
`;

const BannerButton = styled.button`
  width: fit-content;
  padding: 1px 6px;
  border-radius: 20px;
  color: ${({ theme }) => theme.colors.pink_50};
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.pink_50};
  ${({ theme }) => theme.fonts.PRETENDARD_12_400};
`;

const BannerDate = styled.p`
  float: right;
  ${({ theme }) => theme.fonts.PRETENDARD_12_400};
`;

const BannerStatusLabel = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 2px 8px;
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.pink_100};
  ${({ theme }) => theme.fonts.PRETENDARD_12_600};

  &.upcoming {
    background-color: ${({ theme }) => theme.colors.pink_50};
  }

  &.ended {
    background-color: ${({ theme }) => theme.colors.gray_100};
  }
`;

const Contents = styled.div`
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
