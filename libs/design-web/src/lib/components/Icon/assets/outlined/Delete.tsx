import React from 'react';

interface DeleteProps {
  fillColor: string;
  borderColor: string;
  height: number;
  width: number;
  className?: string;
}

export const Delete: React.FC<DeleteProps> = ({
  fillColor,
  borderColor,
  height,
  width,
  className,
}: DeleteProps) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 20 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.15341 21.6663C3.55786 21.6663 3.04986 21.4565 2.62941 21.037C2.20986 20.6174 2.00008 20.1094 2.00008 19.513V2.99965H0.666748V1.66631H6.00008V0.639648H14.0001V1.66631H19.3334V2.99965H18.0001V19.513C18.0001 20.1263 17.7947 20.6383 17.3841 21.049C16.9725 21.4605 16.4601 21.6663 15.8467 21.6663H4.15341ZM16.6667 2.99965H3.33341V19.513C3.33341 19.7521 3.4103 19.9485 3.56408 20.1023C3.71786 20.2561 3.9143 20.333 4.15341 20.333H15.8467C16.0512 20.333 16.2392 20.2476 16.4107 20.077C16.5814 19.9054 16.6667 19.7174 16.6667 19.513V2.99965ZM7.07741 17.6663H8.41075V5.66631H7.07741V17.6663ZM11.5894 17.6663H12.9227V5.66631H11.5894V17.6663Z"
        fill={fillColor}
      />
    </svg>
  );
};

export default Delete;