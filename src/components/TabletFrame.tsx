import React from 'react';

interface TabletFrameProps {
  children: React.ReactNode;
}

const TabletFrame: React.FC<TabletFrameProps> = ({ children }) => {
  const backgroundClasses = "flex min-h-screen w-full items-center justify-center bg-gray-100 p-8";

  // 1.5x scaled dimensions
  const frameClasses = "relative mx-auto h-[1152px] w-[1536px] rounded-[54px] border-[24px] border-black bg-black shadow-2xl";
  const screenClasses = "relative h-full w-full overflow-hidden rounded-[30px] bg-white";

  return (
    <div className={backgroundClasses}>
      <div className={frameClasses}>
        {/* Front-facing camera */}
        <div className="absolute top-1/2 left-[9px] z-10 h-[12px] w-[12px] -translate-y-1/2 rounded-full bg-gray-800"></div>

        {/* Screen */}
        <div className={screenClasses}>
            <div className="h-full w-full overflow-y-auto">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabletFrame;
