import styled from 'styled-components';

const NoContent = () => {
  return (
    <StyledNoContent>
      <NoContentText>등록된 컨텐츠가 없습니다.</NoContentText>
    </StyledNoContent>
  );
};

export default NoContent;

const StyledNoContent = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NoContentText = styled.p`
  ${({ theme }) => theme.fonts.PRETENDARD_16_400};
  color: ${({ theme }) => theme.colors.gray_100};
`;
