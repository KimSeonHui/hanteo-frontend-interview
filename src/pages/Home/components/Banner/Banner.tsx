import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

import type { Event as Banner, EventStatus as BannerStatus, EventType as BannerType } from '@type';
import { getBanners } from '@api/banner';

const Banner = () => {
  const [banners, setBanners] = useState<Banner[]>([]);

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

  useEffect(() => {
    getBanners().then((data) => {
      setBanners(data.banners);
    });
  }, []);

  return (
    banners.length > 0 && (
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
            <StyledBanner>
              <BannerStatusLabel className={banner.status}>{getBannerStatusLabel(banner.status)}</BannerStatusLabel>
              <picture>
                <source srcSet={`${banner.thumbnail}.webp?random=${banner.id}`} type="image/webp" />
                <source srcSet={`${banner.thumbnail}.jpg?random=${banner.id}`} type="image/jpeg" />
                <BannerImage src={`${banner.thumbnail}.jpg?random=${banner.id}`} alt="banner" />
              </picture>
              <BannerContent>
                <BannerTitleRow>
                  <BannerTitle>{banner.title}</BannerTitle>
                  <BannerButton>{getBannerButtonText(banner.type)}</BannerButton>
                </BannerTitleRow>
                <BannerDate>
                  {banner.startDate} ~ {banner.endDate}(KST)
                </BannerDate>
              </BannerContent>
            </StyledBanner>
          </StyledSwiperSlide>
        ))}
      </StyledSwiper>
    )
  );
};

export default Banner;

const StyledSwiper = styled(Swiper)`
  padding-bottom: 40px;
  margin-bottom: 30px;

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

const StyledBanner = styled.div`
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
