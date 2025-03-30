import { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import type { EventStatus, EventType, Event } from '@type';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getEvents } from '@api/event';

const PAGE_SIZE = 5;

const Event = () => {
  const [events, setEvents] = useState<Event[]>([]);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastContentRef = useRef<HTMLDivElement>(null);

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['events'],
    queryFn: ({ pageParam }) => getEvents(pageParam, PAGE_SIZE),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.events.length > 0 ? allPages.length + 1 : undefined;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
  });

  const getEventButtonText = (type: EventType) => {
    switch (type) {
      case 'vote':
        return '투표하기';
      default:
        return '신청하기';
    }
  };

  const getEventStatusLabel = (status: EventStatus) => {
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
    if (data) {
      const newEvents = data.pages.flatMap((page) => page.events);
      setEvents(newEvents);
    }
  }, [data]);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(async (entry) => {
          if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        });
      },
      {
        threshold: 0.7,
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
  }, [hasNextPage, isFetchingNextPage]);

  return (
    <>
      {events.map((event) => (
        <StyledEvent key={event.id}>
          <EventStatusLabel className={event.status}>{getEventStatusLabel(event.status)}</EventStatusLabel>
          <picture>
            <source srcSet={`${event.thumbnail}.webp`} type="image/webp" />
            <source srcSet={`${event.thumbnail}.jpg`} type="image/jpeg" />
            <EventImage src={`${event.thumbnail}.jpg`} alt="banner" />
          </picture>
          <EventContent>
            <EventTitleRow>
              <EventTitle>{event.title}</EventTitle>
              <EventButton>{getEventButtonText(event.type)}</EventButton>
            </EventTitleRow>
            <EventDate>
              {event.startDate} ~ {event.endDate}(KST)
            </EventDate>
          </EventContent>
        </StyledEvent>
      ))}
      {(isFetchingNextPage || events.length === 0) &&
        Array.from({ length: 5 }).map((_, index) => (
          <StyledEvent key={index}>
            <SkeletonImage />
            <EventContent>
              <EventTitleRow>
                <SkeletonText />
                <SkeletonText className="short" />
              </EventTitleRow>
              <SkeletonText className="short" />
            </EventContent>
          </StyledEvent>
        ))}
      <LastContent ref={lastContentRef} />
    </>
  );
};

export default Event;

const StyledEvent = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  border-radius: 10px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray_50};
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const EventImage = styled.img`
  width: 100%;
  height: 130px;
  object-fit: cover;
  margin-bottom: 5px;
`;

const EventContent = styled.div`
  width: 100%;
  padding: 0 10px;
`;

const EventTitleRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const EventTitle = styled.p`
  width: 100%;
  max-width: 70%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ${({ theme }) => theme.fonts.PRETENDARD_14_400};
`;

const EventButton = styled.button`
  width: fit-content;
  padding: 1px 6px;
  border-radius: 20px;
  color: ${({ theme }) => theme.colors.pink_50};
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.pink_50};
  ${({ theme }) => theme.fonts.PRETENDARD_12_400};
`;

const EventDate = styled.p`
  float: right;
  ${({ theme }) => theme.fonts.PRETENDARD_12_400};
`;

const EventStatusLabel = styled.div`
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
  width: 100%;
  height: 130px;
  background-color: ${({ theme }) => theme.colors.gray_100};
  animation: ${skeletonGradient} 1.5s infinite;
  margin-bottom: 10px;
`;

const SkeletonText = styled.div`
  width: 150px;
  height: 20px;
  background-color: ${({ theme }) => theme.colors.gray_100};
  animation: ${skeletonGradient} 1.5s infinite;
  border-radius: 4px;

  &.short {
    width: 60px;
  }
`;
