import classNames from 'classnames';

function Panel({ children, className, ...rest }) {
  const finalClassNames = classNames(
    ' rounded p-2 shadow-md bg-[#B5C0D0] text-[#211951] text-font_c w-4/5 mx-8 my-2',
    className
  );

  return (
    <div {...rest} className={finalClassNames}>
      {children}
    </div>
  );
}

export default Panel;