import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import IphoneFrame from './iPhoneFrame';
import TabletFrame from './TabletFrame';

interface ShowcasePageLayoutProps {
  title: string;
  description: string;
  previousLink?: string;
  nextLink?: string;
  journeyType: 'customer' | 'staff' | 'admin';
  children: React.ReactNode;
}

const ShowcasePageLayout: React.FC<ShowcasePageLayoutProps> = ({
  title,
  description,
  previousLink,
  nextLink,
  journeyType,
  children,
}) => {
  const DeviceFrame = journeyType === 'admin' ? TabletFrame : IphoneFrame;

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-800 text-white">
      {/* Left Panel: Info and Navigation */}
      <div className="w-full lg:w-80 xl:w-96 bg-gray-900 p-8 flex flex-col justify-between order-2 lg:order-1">
        <div>
          <h1 className="text-2xl font-bold text-purple-400 mb-2">{title}</h1>
          <p className="text-gray-300 leading-relaxed">
            {description}
          </p>
        </div>
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Journey Navigation</h3>
          <div className="flex space-x-4">
            {previousLink ? (
              <Link to={previousLink} className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-colors">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Previous
              </Link>
            ) : (
              <div className="flex-1 bg-gray-800 text-gray-500 font-bold py-3 px-4 rounded-lg flex items-center justify-center cursor-not-allowed">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Previous
              </div>
            )}
            {nextLink ? (
              <Link to={nextLink} className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-colors">
                Next
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            ) : (
              <div className="flex-1 bg-gray-800 text-gray-500 font-bold py-3 px-4 rounded-lg flex items-center justify-center cursor-not-allowed">
                Next
                <ArrowRight className="w-5 h-5 ml-2" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Panel: Device Frame */}
      <div className="flex-1 flex items-center justify-center p-4 relative order-1 lg:order-2">
        <Link
          to="/samples"
          className="absolute top-4 right-4 bg-gray-700 hover:bg-gray-600 text-white rounded-full p-3 z-20"
          aria-label="Exit Showcase"
        >
          <X className="w-6 h-6" />
        </Link>
        <DeviceFrame>{children}</DeviceFrame>
      </div>
    </div>
  );
};

export default ShowcasePageLayout;
