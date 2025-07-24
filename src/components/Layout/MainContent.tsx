import { css } from '@emotion/react';
import { MainContentProps } from '../../types';

const MainContent: React.FC<MainContentProps> = ({ title, children }) => {
  const containerStyle = css`
    display: flex;
    flex-direction: column;
    flex: 1;
    background-color: #FFF;
    min-height: 869px;
    border-radius: 8px 0px 0px 0px;
    border-right: 1px solid #E1E6EC;
  `;

  const sidebarInfoStyle = css`
    width: 260px;
    height: 869px;
    position: relative;
    background-color: #FFF;
    border-radius: 8px 0px 0px 0px;
    border-right: 1px solid #E1E6EC;

    @media (max-width: 991px) {
      width: 220px;
    }

    @media (max-width: 640px) {
      width: 180px;
    }
  `;

  const titleStyle = css`
    color: #000;
    position: absolute;
    left: 20px;
    top: 20px;
    font: 700 20px/80% Pretendard;

    @media (max-width: 640px) {
      font-size: 18px;
      left: 16px;
      top: 16px;
    }
  `;

  const headerBarStyle = css`
    display: flex;
    width: 100%;
    height: 58px;
    padding: 5px 0px;
    align-items: center;
    gap: 16px;
    border-bottom: 2px solid #D7D7D7;
    background-color: #FFF;

    @media (max-width: 640px) {
      height: 40px;
      padding: 3px 0px;
    }
  `;

  const backButtonStyle = css`
    display: flex;
    width: 29px;
    height: 48px;
    padding: 14px 5px;
    align-items: center;
    gap: 10px;
    border-radius: 0px 8px 8px 0px;
    border-top: 1px solid #E1E6EC;
    border-right: 1px solid #E1E6EC;
    border-bottom: 1px solid #E1E6EC;
    background-color: #FFF;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #F5F7FA;
    }

    @media (max-width: 640px) {
      height: 34px;
      padding: 8px 4px;
    }
  `;

  const breadcrumbStyle = css`
    color: #000;
    margin-left: 16px;
    font: 600 18px/80% Pretendard;

    @media (max-width: 640px) {
      font-size: 16px;
      margin-left: 12px;
    }
  `;

  const contentAreaStyle = css`
    width: 100%;
    height: 811px;
    background-color: #FFF;
    padding: 20px;

    @media (max-width: 640px) {
      padding: 16px;
    }
  `;

  const arrowIcon = `<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.66876 4.98752L4.85007 8.17502C4.97095 8.2959 5.03239 8.44071 5.03439 8.60946C5.03651 8.77821 4.97507 8.92509 4.85007 9.05009C4.7292 9.17096 4.58339 9.2314 4.41264 9.2314C4.24176 9.2314 4.09589 9.17096 3.97501 9.05009L0.350075 5.42515C0.28345 5.3584 0.236575 5.28965 0.20945 5.2189C0.182325 5.14802 0.168762 5.0709 0.168762 4.98752C0.168762 4.90427 0.182325 4.82721 0.20945 4.75634C0.236575 4.68546 0.28345 4.61671 0.350075 4.55009L3.97501 0.925147C4.09589 0.804272 4.2407 0.742773 4.40945 0.740648C4.5782 0.738648 4.72507 0.800147 4.85007 0.925147C4.97095 1.0459 5.03139 1.19171 5.03139 1.36259C5.03139 1.53346 4.97095 1.67927 4.85007 1.80002L1.66876 4.98752ZM6.48132 4.98752L9.66264 8.17502C9.78339 8.2959 9.84482 8.44071 9.84695 8.60946C9.84907 8.77821 9.78764 8.92509 9.66264 9.05009C9.54176 9.17096 9.39589 9.2314 9.22501 9.2314C9.05426 9.2314 8.90845 9.17096 8.78757 9.05009L5.16264 5.42515C5.09589 5.3584 5.04901 5.28965 5.02201 5.2189C4.99489 5.14802 4.98132 5.0709 4.98132 4.98752C4.98132 4.90427 4.99489 4.82721 5.02201 4.75634C5.04901 4.68546 5.09589 4.61671 5.16264 4.55009L8.78757 0.925147C8.90845 0.804272 9.05326 0.742773 9.22201 0.740648C9.39076 0.738648 9.53764 0.800147 9.66264 0.925147C9.78339 1.0459 9.84376 1.19171 9.84376 1.36259C9.84376 1.53346 9.78339 1.67927 9.66264 1.80002L6.48132 4.98752Z" fill="#727E88"></path>
  </svg>`;

  return (
    <div css={containerStyle}>
      <div css={sidebarInfoStyle}>
        <div css={titleStyle}>{title}</div>
      </div>

      <div css={headerBarStyle}>
        <div css={backButtonStyle}>
          <div
            css={css`
              width: 18px;
              height: 18px;
            `}
            dangerouslySetInnerHTML={{ __html: arrowIcon }}
          />
        </div>
        <div css={breadcrumbStyle}>받은 메일</div>
      </div>

      <div css={contentAreaStyle}>
        {children}
      </div>
    </div>
  );
};

export default MainContent;
