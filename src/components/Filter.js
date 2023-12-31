import React from "react";
import FilterIcon from "../assets/icons/filter.svg";
import useClickOutSide from "../hooks/useClickOutSide";
import RangeSlider from "./input/RangeSlider";
import { useForm } from "react-hook-form";
import InputNumberFilter from "./input/InputNumberFilter";
import FilterSelect from "./select-input/FilterSelect";
import { WeightUnitProvider } from "../contexts/weightUnit-context";

const moveToElement = (elementCoord) => {
  // const blue = document.getElementById('blue');
  let position = elementCoord.getBoundingClientRect();
  // scrolls to 20px above element
  window.scrollTo(position.left, position.top + window.scrollY - 200);
};

const Filter = () => {
  const { show, nodeRef, setShow } = useClickOutSide();
  const handleClickFilter = (e) => {
    console.log(e.target.get);
    moveToElement(e.target);
    setShow(!show);
  };
  const {
    control,
    setValue,
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      price: { min: 0, max: 100 },
      brand: "",
      weight: "",
      unitWeight: "Gam",
    },
  });
  const onSubmit = (data) => {
    if (isValid) {
      console.log(data);
    }
  };
  return (
    <div class="filter-wrap" ref={nodeRef}>
      <button
        onClick={handleClickFilter}
        class="filter-btn"
        toggle-target="#filter-home"
      >
        Filter
        <img src={FilterIcon} alt="" class="filter-btn__icon icon" />
      </button>

      <div class={`filter ${show ? "show" : "hide"}`} id="filter-home">
        <img src="./assets/icons/arrow.png" alt="" class="filter__arrow" />
        <h3 class="filter__heading">Filter</h3>
        <form onSubmit={handleSubmit(onSubmit)} class="filter__form">
          <div class="filter__row filter__content">
            {/* <!-- Filter column 1 --> */}
            <div class="filter__col">
              <label for="" class="filter__form-label">
                Price
              </label>
              <div class="filter__form-group">
                <RangeSlider
                  min={0}
                  max={100}
                  step={5}
                  control={control}
                  nameMax={"max"}
                  nameMin={"min"}
                />
              </div>
              <div class="filter__form-group filter__form-group--inline">
                <div>
                  <label
                    for=""
                    class="filter__form-label filter__form-label--small"
                  >
                    {" "}
                    Minimum{" "}
                  </label>
                  <div class="filter__form-text-input filter__form-text-input--small">
                    <InputNumberFilter
                      name="min"
                      className="filter__form-input filter__form-input--small"
                      control={control}
                    ></InputNumberFilter>
                  </div>
                </div>
                <div>
                  <label
                    for=""
                    class="filter__form-label filter__form-label--small"
                  >
                    {" "}
                    Maximum{" "}
                  </label>
                  <div class="filter__form-text-input filter__form-text-input--small">
                    <InputNumberFilter
                      name="max"
                      className="filter__form-input filter__form-input--small"
                      control={control}
                    ></InputNumberFilter>
                  </div>
                </div>
              </div>
            </div>

            <div class="filter__separate"></div>

            {/* <!-- Filter column 2 --> */}
            <div class="filter__col">
              <label for="" class="filter__form-label">
                Size/Weight
              </label>
              <div class="filter__form-group">
                <div class="filter__form-select-wrap">
                  <WeightUnitProvider>
                    <FilterSelect
                      control={control}
                      setValue={setValue}
                      name={"weight"}
                    ></FilterSelect>
                    <FilterSelect
                      control={control}
                      setValue={setValue}
                      name={"unitWeight"}
                      data={["Gam", "Kg"]}
                      weight={false}
                    ></FilterSelect>
                  </WeightUnitProvider>
                </div>
              </div>
              <div class="filter__form-group">
                <div class="filter__form-tags">
                  <button class="filter__form-tag">Small</button>
                  <button class="filter__form-tag">Medium</button>
                  <button class="filter__form-tag">Large</button>
                </div>
              </div>
            </div>

            <div class="filter__separate"></div>

            {/* <!-- Filter column 3 --> */}
            <div class="filter__col">
              <div class="filter__col">
                <label for="" class="filter__form-label">
                  Brand
                </label>
              </div>
              <div class="filter__form-group">
                <div class="filter__form-text-input">
                  <input
                    {...register("brand")}
                    type="text"
                    id="brand"
                    placeholder="Search brand name"
                    class="filter__form-input"
                  />
                  <img
                    src="./assets/icons/search.svg"
                    alt=""
                    class="filter__form-input-icon icon"
                  />
                </div>
              </div>
              <div class="filter__form-group">
                <div class="filter__form-tags">
                  <button class="filter__form-tag">Lavazza</button>
                  <button class="filter__form-tag">Nescafe</button>
                  <button class="filter__form-tag">Starbucks</button>
                </div>
              </div>
            </div>
          </div>
          <div class="filter__row filter__footer">
            <div className="filter__action">
              <button
                class="btn btn--text filter__cancel js-toggle"
                type="button"
                onClick={handleClickFilter}
              >
                Cancel
              </button>
              <button
                class="btn btn--primary filter__submit js-toggle"
                toggle-target="#filter-home"
              >
                Show Result
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Filter;
