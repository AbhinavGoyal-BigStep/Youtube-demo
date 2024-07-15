import React from 'react';

interface HomeProps {
  fillColor: string;
  borderColor: string;
  height: number;
  width: number;
  className?: string;
}

export const Home: React.FC<HomeProps> = ({
  fillColor,
  borderColor,
  height,
  width,
  className,
}: HomeProps) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_1884_4922)">
        <path
          d="M19.4608 8.69904C19.4603 8.69858 19.4599 8.69812 19.4594 8.69766L11.301 0.539551C10.9532 0.19165 10.4909 0 9.9991 0C9.50731 0 9.04497 0.191498 8.69707 0.539398L0.542928 8.69339C0.540182 8.69614 0.537435 8.69904 0.534688 8.70178C-0.179423 9.42001 -0.178202 10.5853 0.538198 11.3017C0.865499 11.6292 1.29778 11.8188 1.75997 11.8387C1.77874 11.8405 1.79766 11.8414 1.81673 11.8414H2.1419V17.8453C2.1419 19.0334 3.10854 20 4.2969 20H7.48873C7.81221 20 8.07467 19.7377 8.07467 19.4141V14.707C8.07467 14.1649 8.51564 13.7239 9.05779 13.7239H10.9404C11.4826 13.7239 11.9235 14.1649 11.9235 14.707V19.4141C11.9235 19.7377 12.1858 20 12.5095 20H15.7013C16.8897 20 17.8563 19.0334 17.8563 17.8453V11.8414H18.1578C18.6495 11.8414 19.1118 11.6499 19.4599 11.302C20.177 10.5844 20.1773 9.41711 19.4608 8.69904Z"
          fill={fillColor}
        />
      </g>
      <defs>
        <clipPath id="clip0_1884_4922">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Home;