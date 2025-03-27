import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

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
      <Swiper spaceBetween={10} slidesPerView={1.2} centeredSlides={true} loop={true}>
        <StyledSwiperSlide>
          <Banner>
            <BannerImage src="https://picsum.photos/200/200" alt="banner" />
            <BannerContent>
              <BannerTitleRow>
                <BannerTitle>{`['SPECIAL STAGE/4K' PLAVE(플레이브) - Pink Venom (원곡 : BLACKPINK)]`}</BannerTitle>
                <BannerButton>투표하기</BannerButton>
              </BannerTitleRow>
              <BannerDate>2025.03.27 ~ 2025.04.03(KST)</BannerDate>
            </BannerContent>
          </Banner>
        </StyledSwiperSlide>
        <StyledSwiperSlide>
          <Banner>
            <BannerImage src="https://picsum.photos/200/300" alt="banner" />
            <BannerContent>
              <BannerTitleRow>
                <BannerTitle>{`['SPECIAL STAGE/4K' PLAVE(플레이브) - Pink Venom (원곡 : BLACKPINK)]`}</BannerTitle>
                <BannerButton>투표하기</BannerButton>
              </BannerTitleRow>
              <BannerDate>2025.03.27 ~ 2025.04.03(KST)</BannerDate>
            </BannerContent>
          </Banner>
        </StyledSwiperSlide>
        <StyledSwiperSlide>
          <Banner>
            <BannerImage src="https://picsum.photos/200/400" alt="banner" />
            <BannerContent>
              <BannerTitleRow>
                <BannerTitle>{`['SPECIAL STAGE/4K' PLAVE(플레이브) - Pink Venom (원곡 : BLACKPINK)]`}</BannerTitle>
                <BannerButton>투표하기</BannerButton>
              </BannerTitleRow>
              <BannerDate>2025.03.27 ~ 2025.04.03(KST)</BannerDate>
            </BannerContent>
          </Banner>
        </StyledSwiperSlide>
        <StyledSwiperSlide>
          <Banner>
            <BannerImage src="https://picsum.photos/200/500" alt="banner" />
            <BannerContent>
              <BannerTitleRow>
                <BannerTitle>{`['SPECIAL STAGE/4K' PLAVE(플레이브) - Pink Venom (원곡 : BLACKPINK)]`}</BannerTitle>
                <BannerButton>투표하기</BannerButton>
              </BannerTitleRow>
              <BannerDate>2025.03.27 ~ 2025.04.03(KST)</BannerDate>
            </BannerContent>
          </Banner>
        </StyledSwiperSlide>
      </Swiper>
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
    ${({ theme }) => theme.fonts.PRETENDARD_16_600};
  }
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  width: calc(100% - 20px);
`;

const Banner = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 10px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray};
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
  color: ${({ theme }) => theme.colors.pink};
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.pink};
  ${({ theme }) => theme.fonts.PRETENDARD_12_400};
`;

const BannerDate = styled.p`
  float: right;
  ${({ theme }) => theme.fonts.PRETENDARD_12_400};
`;
