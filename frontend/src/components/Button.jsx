// import propTypes from 'prop-types';
import className from "classnames";
import { twMerge } from "tailwind-merge";

function Button({
  children,
  primary,
  secondary,
  success,
  warnings,
  danger,
  outline,
  rounded,
  ...rest
}) {
  //  console.log(rest.className);
    const classes = twMerge(
        className('flex items-center px-3 py-1.5 border my-1 mx-1', {
          'border-blue-500 bg-blue-500 text-white hover:bg-blue-600 ...': primary,
          'border-cyan-900 bg-cyan-700 text-white hover:bg-cyan-900 ...': secondary,
          'border-green-500 bg-green-500 text-white hover:bg-green-600 ...': success,
          'border-yellow-400 bg-yellow-400 text-white hover:bg-yellow-600 ...': warnings,
          'border-red-500 bg-red-500 text-white hover:bg-red-600 ...': danger,
          'rounded-full ': rounded,
          'bg-white hover:text-white ...': outline,
          'text-blue-500 hover:text-white ...': outline && primary,
          'text-cyan-900 hover:text-white ...': outline && secondary,
          'text-green-500 hover:text-white ...': outline && success,
          'text-yellow-400 hover:text-white ...': outline && warnings,
          'text-red-500 hover:text-white ...': outline && danger
        },rest.className)
      );
  return <button {...rest} className={classes}>{children}</button>;
}

Button.propTypes = {
  checkVariationValue: ({ primary, secondary, success, warnings, danger }) => {
    const count =
      Number(!!primary) +
      Number(!!secondary) +
      Number(!!success) +
      Number(!!warnings) +
      Number(!!danger);

    if (count > 1) {
      return new Error(
        "Only one of Primary , secondary, success , warning or danger"
      );
    }
  },
};

export default Button;