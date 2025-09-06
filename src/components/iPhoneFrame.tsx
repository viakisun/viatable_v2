import React from 'react';
import './iPhoneFrame.css';

interface iPhoneFrameProps {
  children: React.ReactNode;
}

const iPhoneFrame: React.FC<iPhoneFrameProps> = ({ children }) => {
  return (
    <div className="iphone-frame-background">
      <div className="iphone-frame">
        <div className="iphone-notch">
          <div className="iphone-camera"></div>
          <div className="iphone-speaker"></div>
        </div>
        <div className="iphone-screen">
          {children}
        </div>
      </div>
    </div>
  );
};

export default iPhoneFrame;
