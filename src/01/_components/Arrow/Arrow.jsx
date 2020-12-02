import React from 'react';


const Arrow = ({isDisabled = false, isRight = false}) => {
    const color = isDisabled ? "var(--main-32)" : "var(--main-100)";
    return (
        <div>
            <svg width="6" height="10" viewBox="0 0 6 10" fill={color} xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M4.5 0.499878C4.77614 0.223736 5.22386 0.223735 5.5 0.499878C5.77614 0.77602 5.77614 1.22374 5.5 1.49988L2 4.99988L5.5 8.49988C5.77614 8.77602 5.77614 9.22374 5.5 9.49988C5.22386 9.77602 4.77614 9.77602 4.5 9.49988L-2.18557e-07 4.99988L4.5 0.499878Z"
                      fill={color}
                      transform={isRight ? "scale (-1, 1)" : null}
                      transform-origin={isRight ? "center" : null}
                />
            </svg>
        </div>
    )
}

// TLogo.propTypes = {
//     className: PropTypes.string,
//     fill: PropTypes.string,
// };
//
// TLogo.defaultProps = {
//     className: undefined,
//     fill: '#333',
// };

export default Arrow;