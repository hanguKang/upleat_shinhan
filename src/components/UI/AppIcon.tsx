import { css } from '@emotion/react';
import { AppIconProps } from '../../types';

const AppIcon: React.FC<AppIconProps> = ({
  icon,
  label,
  customContent,
  size = 'medium',
  isActive = false
}) => {

  // --- 핵심 수정 또는 확인 부분 ---
  // icon prop이 이미지 경로인지 SVG 문자열인지 판단하는 헬퍼 함수
  // .svg 확장자도 이미지 파일로 처리하도록 추가했습니다.
  const isImageUrl = (iconString: string) => {
    return (
      iconString.startsWith('/') || // 절대 경로 (가장 흔한 경우)
      iconString.startsWith('http://') || // 외부 URL
      iconString.startsWith('https://') ||
      iconString.endsWith('.png') ||
      iconString.endsWith('.jpg') ||
      iconString.endsWith('.jpeg') ||
      iconString.endsWith('.gif') ||
      iconString.endsWith('.svg') // SVG 파일도 이미지 태그로 로드할 수 있도록 추가 (옵션)
    );
  };
  // --- 핵심 수정 또는 확인 부분 끝 --

  const sizeStyles = {
    small: {
      container: css`
        width: 44px;
        height: 44px;
        padding: 4px 10px 2px 10px;
        @media (max-width: 991px) {
          width: 40px;
          height: 40px;
          padding: 3px 8px 2px 8px;
        }
      `,
      content: css`
        width: 20px;
        gap: 1px;
      `,
      icon: css`
        width: 20px;
        height: 20px;
      `,
      text: css`
        font-size: 9px;
      `
    },
    medium: {
      container: css`
        width: 64px;
        height: 60px;
        padding: 8px 18px 4px 18px;
        @media (max-width: 991px) {
          width: 52px;
          height: 52px;
          padding: 6px 14px 3px 14px;
        }
        @media (max-width: 640px) {
          width: 44px;
          height: 44px;
          padding: 4px 10px 2px 10px;
        }
      `,
      content: css`
        width: 28px;
        gap: 2px;
        @media (max-width: 991px) {
          width: 24px;
        }
        @media (max-width: 640px) {
          width: 20px;
          gap: 1px;
        }
      `,
      icon: css`
        width: 24px;
        height: 24px;
        text-align:center;
        @media (max-width: 640px) {
          width: 20px;
          height: 20px;
        }
      `,
      text: css`
        font: 600 12px/150% Pretendard;
        @media (max-width: 991px) {
          font-size: 10px;
        }
        @media (max-width: 640px) {
          font-size: 9px;
        }
      `
    },
    large: {
      container: css`
        width: 80px;
        height: 76px;
        padding: 12px 22px 6px 22px;
      `,
      content: css`
        width: 36px;
        gap: 4px;
      `,
      icon: css`
        width: 32px;
        height: 32px;
      `,
      text: css`
        font: 600 14px/150% Pretendard;
      `
    }
  };

  const containerStyle = css`
    display: flex;
    align-items: center;
    gap: 10px;
    background-color: #15213D;
    cursor: pointer;
    transition: all 0.2s ease;
    border-radius: 4px;

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    ${isActive && `
      background-color: rgba(255, 255, 255, 0.15);
      border: 1px solid rgba(255, 255, 255, 0.2);
    `}

    ${sizeStyles[size].container}
  `;

  const contentStyle = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-shrink: 0;
    ${sizeStyles[size].content}
  `;

  const iconStyle = css`
    position: relative;
    aspect-ratio: 1/1;
    ${sizeStyles[size].icon}
  `;

  const textStyle = css`
    align-self: stretch;
    color: #FFF;
    text-align: center;
    letter-spacing: -0.72px;
    ${sizeStyles[size].text}
  `;

  return (
    <div css={containerStyle}>
      <div css={contentStyle}>
        <div css={iconStyle}>
          {customContent ? (
            <div
              css={css`
                color: #FFF;
                text-align: center;
                letter-spacing: -0.63px;
                position: absolute;
                left: 0px;
                top: 6px;
                width: 100%;
                height: 16px;
                font: 700 10.5px/150% OneShinhan;
              `}
              dangerouslySetInnerHTML={{ __html: customContent }}
            />
          ) : (
            // 이 부분이 중요합니다: icon 값이 이미지 경로인지 SVG 문자열인지 판단
            icon && isImageUrl(icon) ? ( // icon 값이 있고 이미지 URL처럼 보이면
              <img
                src={icon} // img 태그의 src 속성에 직접 경로를 할당
                //alt="{`${label} 아이콘`}"
                alt=""
                css={css`
                  width: 100%; // iconStyle에서 지정된 크기에 맞춤
                  height: 100%;
                  object-fit: contain; // 이미지가 잘리지 않고 비율 유지
                `}
              />
            ) : (
              // 그 외의 경우 (SVG 문자열이거나 알 수 없는 타입)
              <div dangerouslySetInnerHTML={{ __html: icon || '' }} />
            )
          )}
        </div>
        <div css={textStyle}>{label}</div>
      </div>
    </div>
  );
};

export default AppIcon;
