import styled from 'styled-components';

export const NavWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  padding: 15px 30px;
  background: rgba(15, 14, 18, 0.7); /* 与搜索框一致的深色背景 */
  border: 1px solid rgba(216, 180, 254, 0.2);
  border-radius: 20px;
  backdrop-filter: blur(12px);
  width: fit-content;
  margin: 0 auto;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(216, 180, 254, 0.5);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }
`;

export const NavLink = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: all 0.3s ease;

  .anticon {
    font-size: 24px;
  }

  span {
    font-size: 12px;
    opacity: 0.6;
  }

  &:hover {
    color: #d8b4fe !important; /* 统一的淡紫色 */
    transform: translateY(-3px);
    span {
      opacity: 1;
    }
  }
`;
