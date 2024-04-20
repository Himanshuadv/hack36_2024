import classNames from 'classnames';

function Panel({ children, className, ...rest }) {
  const finalClassNames = classNames(
    ' rounded p-3 shadow-md bg-side text-font_c w-3/4 my-2',
    className
  );

  return (
    <div {...rest} className={finalClassNames}>
      {children}
    </div>
  );
}

export default Panel;