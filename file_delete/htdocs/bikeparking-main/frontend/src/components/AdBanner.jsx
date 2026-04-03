import React, { useEffect, useRef } from 'react';

const AdBanner = ({ adSlot = 'YOUR_SLOT_ID', adFormat = 'auto' }) => {
  const adRef = useRef(null);
  const isAdLoaded = useRef(false);

  useEffect(() => {
    if (!isAdLoaded.current && adRef.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isAdLoaded.current = true;
      } catch (e) {
        console.error('AdSense error:', e);
      }
    }
  }, []);

  return (
    <div className="ad-container">
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', minHeight: '100px' }}
        data-ad-client="ca-pub-9174038688046015"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
        ref={adRef}
      />
    </div>
  );
};

export default AdBanner;
