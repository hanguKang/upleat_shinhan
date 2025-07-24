import { css } from '@emotion/react';
import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import { NavigationItem } from '../../types';

interface EnterpriseLayoutProps {
  children?: React.ReactNode;
}

const EnterpriseLayout: React.FC<EnterpriseLayoutProps> = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const layoutStyle = css`
    width: 100vw;
    height: 100vh;
    position: relative;
    font-family: 'Pretendard', -apple-system, Roboto, Helvetica, sans-serif;
    background-color: #15213D;
    overflow: hidden;

    @media (max-width: 991px) {
      width: 100%;
      height: auto;
      min-height: 100vh;
    }
  `;

  const mainContainerStyle = css`
    display: flex;
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    bottom: 0;

    @media (max-width: 640px) {
      top: 50px;
    }
  `;

  const contentWrapperStyle = css`
    display: flex;
    flex: 1;
    margin-left: ${isSidebarCollapsed ? '60px' : '148px'};
    transition: margin-left 0.3s ease;

    @media (max-width: 991px) {
      margin-left: ${isSidebarCollapsed ? '50px' : '120px'};
    }

    @media (max-width: 640px) {
      margin-left: ${isSidebarCollapsed ? '40px' : '100px'};
    }
  `;

  const navigationItems: NavigationItem[] = [
    { id: 'board', label: '게시판' },
    { id: 'community', label: '커뮤니티' }
  ];

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div css={layoutStyle}>
      <Header navigationItems={navigationItems} />

      <div css={mainContainerStyle}>
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          onToggle={handleSidebarToggle}
        />

        <div css={contentWrapperStyle}>
          <MainContent title="메일">
            {children || (
              <div css={css`
                padding: 20px;
                color: #666;
                text-align: center;
                font-size: 16px;
              `}>
                메일 콘텐츠가 여기에 표시됩니다.
              </div>
            )}
          </MainContent>
        </div>
      </div>
    </div>
  );
};

export default EnterpriseLayout;
