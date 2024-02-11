import React, { useState, useEffect } from 'react';
import { useRange } from 'react-instantsearch';
import Rheostat from 'rheostat';

import 'rheostat/initialize';
import 'rheostat/css/rheostat.css';

const RangeSlider = props => {
  const { start, range, canRefine, refine } = useRange(props);
  // let { min, max, currentRefinement, canRefine, refine } = props
  const { min, max } = range;
  // min = 0
  // max = 4300
  // const [stateMin, setStateMin] = useState(min)
  // const [stateMax, setStateMax] = useState(max)
  const [value, setValue] = useState({ start: min, end: max });

  const from = Math.max(min || 0, Number.isFinite(start[0]) ? start[0] : min);
  const to = Math.min(max || 4300, Number.isFinite(start[1]) ? start[1] : max);

  useEffect(() => {
    setValue({ start: from, end: to });
  }, [from, to]);

  return (
    <Rheostat
      min={min}
      max={max}
      values={[currentRefinement?.min, currentRefinement?.max]}
      onChange={setValue}
      onValuesUpdated={onValuesUpdated}
    >
      <div
        className="rheostat-marker rheostat-marker--large"
        style={{ left: 0 }}
      >
        <div className="rheostat-value">{value.start}</div>
      </div>
      <div
        className="rheostat-marker rheostat-marker--large"
        style={{ right: 0 }}
      >
        <div className="rheostat-value">{value.end}</div>
      </div>
    </Rheostat>
  )
}

export default RangeSlider;
