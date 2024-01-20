import React, { useState, useEffect } from 'react';

interface TrackingData {
  shippedDate: string;
  estimatedDelivery: string;
  currentLocation: string;
}

interface TrackOrderProps {
  orderId: number;
  onClose: () => void;
}

const TrackOrder: React.FC<TrackOrderProps> = ({ orderId, onClose }) => {
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);

  useEffect(() => {
    // Fetch tracking data for the given order ID
    fetch(`/api/orders/${orderId}/tracking`)
      .then(response => response.json())
      .then((data: TrackingData) => setTrackingData(data))
      .catch(error => console.error(error));
  }, [orderId]);

  return (
    <div className="track-order">
      <button className="close-button" onClick={onClose}>
        &times;
      </button>
      {trackingData ? (
        <div>
          <h2>Tracking Information</h2>
          <ul>
            <li>Shipped on: {trackingData.shippedDate}</li>
            <li>Estimated delivery: {trackingData.estimatedDelivery}</li>
            <li>Current location: {trackingData.currentLocation}</li>
          </ul>
        </div>
      ) : (
        <p>Loading tracking information...</p>
      )}
    </div>
  );
};

export default TrackOrder;