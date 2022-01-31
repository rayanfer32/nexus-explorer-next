import Toast from 'components/Toast';
import { useState } from 'react';
import { BiClipboard, BiCopy } from 'react-icons/bi';
import { middleElipsis } from 'utils/converter';
import { handleCopy } from 'utils/helper';

export default function CopyText({ value }) {
  const [toastList, setToastList] = useState([]);

  return (
    <>
      <span data-copy={value}>
        {`${value.toString().length > 12 ? middleElipsis(value, 12) : value}`}
        <BiCopy
          onClick={() => {
            handleCopy(value);
            setToastList((prev) => {
              return [
                ...prev,
                {
                  message: `Copied ${value}`,
                  type: 'success',
                  icon: <BiClipboard color="inherit" />,
                },
              ];
            });
          }}
        />
      </span>
      <Toast toastList={toastList} />
    </>
  );
}
