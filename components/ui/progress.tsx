import React from 'react';

interface IProps {
  width: number;
  color: string;
}

const ProgressComponent: React.FC<IProps> = ({ color, width }) => {
  return (
    <div className="h-1.5 w-full border rounded-xl overflow-hidden">
      <div
        style={{
          width: `${width}%`,
        }}
        className={`${color} h-full`}
      ></div>
    </div>
  );
};

export default ProgressComponent;
