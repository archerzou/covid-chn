import React, { useState, Fragment, useEffect } from 'react';
import './SVGMap.css';
import China from '@svg-maps/china';
import { RadioSVGMap } from 'react-svg-map';
import CustomSelector from '../CustomSelector/CustomSelector';
import TextUnderMouse from '../TextUnderMouse/TextUnderMouse';
import SpecificStatBlock from '../SpecificStatBlock/SpecificStatBlock';

import { connect } from 'react-redux';
import { setLocation } from '../../redux/stats/stats.actions';
import { createStructuredSelector } from 'reselect';
import {
  selectSpecificLocation,
  selectSpecificLocationData,
} from '../../redux/stats/stats.selectors';

const SVGMap = ({ setLocation, specificLocation, specificLocationData }) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const { confirmed, deaths, recovered, active } = specificLocationData;
  console.log(specificLocationData)

  useEffect(() => {
    const list = document.getElementsByClassName('svg-map__location');
    for (let i = 0; i < list.length; i++) {
      list[i].style.fill = 'var(--light-grey)';
    }

    const elementToFill = document.getElementsByName(specificLocation)[0];
    elementToFill.style.fill = 'var(--hover-yellow)';
  }, [specificLocation]);

  const customChina = {
    ...China,
    label: 'Custom map label',
    locations: China.locations.map((location) => {
      const name = location.name
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

      if (name === 'Hubei') {
        return {
          ...location,
          name: 'Hubei',
        };
      } else {
        return {
          ...location,
          name: name,
        };
      }
    }),
  };

  const hoverOver = (e) => {
    setHoveredItem(e.target.attributes.name.value);
    e.target.style.fill = 'var(--hover-yellow)';
  };
  const hoverOut = (e) => {
    setHoveredItem(null);
    if (e.target.attributes.name.value !== specificLocation) {
      e.target.style.fill = 'var(--light-grey)';
    }
  };

  return (
    <Fragment>
      <div className='svg-map-container'>
        <CustomSelector
          options={customChina.locations}
          setLocation={setLocation}
          value={specificLocation}
        />
        <RadioSVGMap
          className='svg-map'
          map={customChina}
          onChange={(e) => setLocation(e.attributes.name.value)}
          onLocationMouseOver={(e) => hoverOver(e)}
          onLocationMouseOut={(e) => hoverOut(e)}
        />

        <div className='specific-stats-container'>
          <SpecificStatBlock
            label='Confirmed'
            value={confirmed}
            color='#fe2121'
          />
          <SpecificStatBlock label='Death' value={deaths} color='grey' />
          <SpecificStatBlock
            label='Recovered'
            value={recovered}
            color='#1acb1a'
          />
          <SpecificStatBlock label='Active' value={active} color='#274ea9' />
        </div>
      </div>

      <TextUnderMouse text={hoveredItem} />
    </Fragment>
  );
};

const mapStateToProps = createStructuredSelector({
  specificLocation: selectSpecificLocation,
  specificLocationData: selectSpecificLocationData,
});

const mapDispatchToProps = (dispatch) => ({
  setLocation: (location) => dispatch(setLocation(location)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SVGMap);
