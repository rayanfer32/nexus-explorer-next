import NE_CopyText from 'components/common/NE_CopyText';
import { intlNum } from 'utils';

export const columns = [
  {
    Header: 'Time',
    accessor: 'modified',
    Cell: (props) => new Date(props.value * 1000).toLocaleTimeString(),
  },
  {
    Header: 'Status',
    accessor: 'status',
    Cell: (props) => <div>{props.value}</div>,
  },
  {
    Header: 'Amount',
    accessor: 'amount',
    Cell: (props) => (
      <div>
        {intlNum(props.value)}{' '}
        {props.row.values.ticker == '0' ? 'NXS' : props.row.values.ticker}
      </div>
    ),
  },
  {
    Header: 'Reference',
    accessor: 'reference',
    Cell: (props) => <div>{props.value}</div>,
  },
  {
    Header: 'Sender Detail',
    accessor: 'sender_detail',
  },
  {
    Header: 'Account Payable',
    accessor: 'account',
    Cell: (props) => (
      <NE_CopyText value={props.value} link={`/scan/${props.value}`} />
    ),
  },
  {
    Header: 'Recipient',
    accessor: 'recipient',
    Cell: (props) => (
      <NE_CopyText value={props.value} link={`/scan/${props.value}`} />
    ),
  },
];
