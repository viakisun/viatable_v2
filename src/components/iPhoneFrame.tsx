import React from 'react';

interface iPhoneFrameProps {
  children: React.ReactNode;
}

const iPhoneFrame: React.FC<iPhoneFrameProps> = ({ children }) => {
  return (
    // Background container
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-100 p-4 sm:p-8">
      {/* iPhone Frame */}
      <div className="relative mx-auto h-[896px] w-[414px] rounded-[60px] border-[14px] border-black bg-black shadow-2xl">
        {/* Notch */}
        <div className="absolute left-1/2 top-0 z-10 h-[28px] w-[210px] -translate-x-1/2 rounded-b-2xl bg-black"></div>

        {/* Side buttons (for decoration) */}
        <div className="absolute -left-[17px] top-[140px] h-[60px] w-[5px] rounded-l-lg bg-black"></div>
        <div className="absolute -left-[17px] top-[220px] h-[100px] w-[5px] rounded-l-lg bg-black"></div>
        <div className="absolute -right-[17px] top-[180px] h-[100px] w-[5px] rounded-r-lg bg-black"></div>

        {/* Screen */}
        <div className="h-full w-full overflow-hidden rounded-[46px] bg-white">
          <div className="h-full w-full overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default iPhoneFrame;
