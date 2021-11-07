import SmallCard from '../atoms/SmallCard';
function Panel1() {
  return (
    <div className="container">
      <div className="cardsContainer">
        <SmallCard
          label="ChainHeight"
          sublabel="(Blocks)"
          text="0.72"
          ticker="$"
        />
        <SmallCard
          label="Total Supply"
          sublabel="in NXS"
          text="561525"
          ticker="$"
        />
        <SmallCard
          label="Max Supply"
          sublabel="0.0000032BTC"
          text="74254654"
          ticker="NXS"
        />
        <SmallCard
          label="Total Ciculation"
          //   sublabel="0.0000032BTC"
          text="76546498"
          ticker="NXS"
        />
      </div>
      <style jsx>
        {`
          .container {
            background: grey;
          }

          .cardsContainer {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 1fr 1fr;
            gap: 0.2rem;
          }
        `}
      </style>
    </div>
  );
}

export default Panel1;
