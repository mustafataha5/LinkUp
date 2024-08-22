import * as React from 'react';
import AutoPlaySwipeableViews from '../views/PhotoSlider';

function Ads(props) {
  return (
    <div style={{
      width: '320px', // Ensure it takes full width of its container
      height: '350px', // Adjust height as needed
      backgroundColor: '#f0f0f0', // Background color for the container
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Add some shadow for better visual separation
      overflow: 'hidden', // Ensure content doesn’t overflow
      marginBottom: '20px', // Space below the ad
    }}>
      <AutoPlaySwipeableViews />
    </div>
  );
}

export default Ads;
