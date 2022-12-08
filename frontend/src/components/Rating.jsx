import React from "react";
import PropTypes from "prop-types";

const Rating = ({ value, text, color }) => {
  return (
    <div className='rating'>
      <span style={{ color }}>
        <i
          className={
            value >= 1
              ? "fa-solid fa-star"
              : value >= 0.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        />
      </span>
      <span style={{ color }}>
        <i
          className={
            value >= 2
              ? "fa-solid fa-star"
              : value >= 1.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        />
      </span>
      <span style={{ color }}>
        <i
          className={
            value >= 3
              ? "fa-solid fa-star"
              : value >= 2.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        />
      </span>
      <span style={{ color }}>
        <i
          className={
            value >= 4
              ? "fa-solid fa-star"
              : value >= 3.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        />
      </span>
      <span style={{ color }}>
        <i
          className={
            value >= 5
              ? "fa-solid fa-star"
              : value >= 4.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        />
      </span>
      <span>{text && text}</span>
    </div>
  );
};

Rating.defaultProps = {
  color: "#f8e825",
};
Rating.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default Rating;
