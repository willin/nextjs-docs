// pages/_error.js
function Error(props) {
  return (
    <div>
      <h1>_error.js</h1>
      <pre>{JSON.stringify(props, null, 4)}</pre>
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  // eslint-disable-next-line no-nested-ternary
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
