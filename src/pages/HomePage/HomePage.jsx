import React, { useEffect, useState } from 'react';
import './HomePage.css';
import GeneralStatsDisplay from '../../components/GeneralStatsDisplay/GeneralStatsDisplay';
import BackgroundVideo from '../../components/BackgroundVideo/BackgroundVideo';
import SpinnerBackground from '../../components/SpinnerBackground/SpinnerBackground';

import { connect } from 'react-redux';
import { getGeneralStats } from '../../redux/stats/stats.actions';

const HomePage = ({ getGeneralStats }) => {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    getGeneralStats();

    const videoElement = document.getElementById('video');

    videoElement.addEventListener('loadeddata', () => {
      if (videoElement.readyState >= 3) {
        setReady(true);
      }
    });
  }, [getGeneralStats]);
  return (
    <div className='home-page'>
      {ready ? <GeneralStatsDisplay /> : <SpinnerBackground bgColor='black' />}

      <BackgroundVideo />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getGeneralStats: () => dispatch(getGeneralStats()),
});

export default connect(null, mapDispatchToProps)(HomePage);
