// import { intlNum } from 'utils';

export const OGBotImage = ({ contract, fishName, fishEmoji }) => {
  const bg = `${process.env.NEXT_PUBLIC_DOMAIN_BASE_URL}/og_meta_image_bot.jpg`;

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'hsla(202, 97%, 52%, 1)',
        backgroundImage: `url(${bg})`,
        fontSize: 36,
        color: 'white',
      }}>
      <h2
        style={{
          marginTop: 72,
          marginLeft: 500,
          padding: 10,
          borderRadius: 16,
          backgroundColor: '#012235',
        }}>
        {contract.OP}
      </h2>
      {contract.from && <h2>From - {contract.from}</h2>}
      <span style={{ fontSize: 48 }}>{fishName}</span>
      <span style={{ fontSize: 96 }}>{fishEmoji}</span>
      <h1 style={{ fontSize: 72 }}>
        {contract.amount} {contract.ticker}
        {/* {intlNum(contract.amount)} {contract.ticker} */}
      </h1>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: '#aaa',
          fontSize: 24,
          marginTop: 16,
        }}>
        {contract.proof && <span>Proof - {contract.proof}</span>}
        {contract.to && <span>To - {contract.to}</span>}
      </div>
    </div>
  );
};
