import { intlNum } from 'utils/converter';

export const OGBotImage = ({ contract, fishName, fishEmoji }) => {
  const bg = `${process.env.NEXT_PUBLIC_DOMAIN_BASE_URL}/nexus_water_mark.png`;
  const faviconSvg = `${process.env.NEXT_PUBLIC_DOMAIN_BASE_URL}/favicon.svg`;

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: 'hsla(202, 87%, 25%,1)',
        backgroundImage: `url(${bg})`,
        backgroundSize: '1600 630',
        backgroundRepeat: 'no-repeat',
        fontSize: 36,
        color: 'white',
        padding: '1rem',
      }}>
      <div style={{ display: 'flex' }}>
        <div
          style={{
            // marginLeft: 0,
            padding: '5px 5px',
            borderRadius: 16,
            // backgroundColor: '#fff',
            display: 'flex',
          }}>
          <img
            style={{
              height: '6rem',
              width: '6rem',
            }}
            src={faviconSvg}
          />
        </div>
        <div
          style={{
            marginLeft: 600,
            padding: 20,
            borderRadius: 16,
            backgroundColor: '#012235',
          }}>
          {contract.OP}
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          background: '#fff',
          padding: '1rem 5rem',
          borderRadius: 999,
          color: '#39f',
        }}>
        <div style={{ fontSize: 128 }}>{fishEmoji}</div>
        <div style={{ fontSize: 32 }}>{fishName}</div>
        <div style={{ display: 'flex', fontSize: 64 }}>
          {intlNum(contract.amount)} {contract.ticker}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: '#fff',
          background: '#012235',
          borderRadius: 10,
          padding: 10,
          fontSize: 24,
        }}>
        {contract.from && <span>From - {contract.from.address}</span>}
        {contract.proof && <span>Proof - {contract.proof}</span>}
        {contract.to && <span>To - {contract.to.address}</span>}
      </div>
    </div>
  );
};
