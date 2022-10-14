export const OgImage = (props) => {
  const { block = '' } = props;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        background: 'white',
      }}>
      <h1
        style={{
          marginTop: 40,
        }}>
        {block}
      </h1>
    </div>
  );
};
