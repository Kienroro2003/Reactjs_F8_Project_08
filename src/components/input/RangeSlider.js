import React from "react";
import { useController } from "react-hook-form";

const RangeSlider = ({ min, max, step, control, ...props }) => {
  const {
    field: fieldMax,
    formState: { errors },
  } = useController({
    control,
    name: props.nameMax,
    defaultValue: max,
  });

  const { field: fieldMin } = useController({
    control,
    name: props.nameMin,
    defaultValue: min,
  });
  const { value: valuesMax } = fieldMax;
  const { value: valueMin } = fieldMin;

  const minPos = ((valuesMax - min) / (max - min)) * 100;
  const maxPos = ((valueMin - min) / (max - min)) * 100;

  return (
    <div class="wrapper">
      <div class="input-wrapper">
        <input
          class="input"
          type="range"
          value={valueMin}
          min={min}
          max={max}
          step={step}
          {...fieldMin}
          onChange={(event) => fieldMin.onChange(+event.target.value)}
        />
        <input
          class="input"
          type="range"
          value={valuesMax}
          min={min}
          max={max}
          step={step}
          {...fieldMax}
          onChange={(event) => fieldMax.onChange(+event.target.value)}
        />
      </div>

      <div class="control-wrapper">
        <div class="control" style={{ left: `${minPos}%` }} />
        <div class="rail">
          <div
            class="inner-rail"
            style={{ left: `${minPos}%`, right: `${100 - maxPos}%` }}
          />
        </div>
        <div class="control" style={{ left: `${maxPos}%` }} />
      </div>
    </div>
  );
};

export default RangeSlider;
