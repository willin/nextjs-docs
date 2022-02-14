import { useState, useEffect, Children, cloneElement } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const ActiveLink = ({ children, activeClassName, ...props }) => {
  const { asPath, isReady } = useRouter();

  const child = Children.only(children);
  const childClassName = child.props.className || '';
  const [className, setClassName] = useState(childClassName);

  useEffect(() => {
    // Check if the router fields are updated client-side
    if (isReady) {
      // Dynamic route will be matched via props.as
      // Static route will be matched via props.href
      // eslint-disable-next-line no-restricted-globals
      const linkPathname = new URL(props.as || props.href, location.href)
        .pathname;

      // Using URL().pathname to get rid of query and hash
      // eslint-disable-next-line no-restricted-globals
      const activePathname = new URL(asPath, location.href).pathname;

      const newClassName =
        linkPathname === activePathname
          ? `${childClassName} ${activeClassName}`.trim()
          : childClassName;

      if (newClassName !== className) {
        setClassName(newClassName);
      }
    }
  }, [
    asPath,
    isReady,
    props.as,
    props.href,
    childClassName,
    activeClassName,
    setClassName,
    className
  ]);
  const { href, ...others } = props;

  return (
    <Link href={href} {...others}>
      {cloneElement(child, {
        className: className || null
      })}
    </Link>
  );
};

export default ActiveLink;
