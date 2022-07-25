import { intlNum, timestampToDate } from 'utils';
import { InvoiceStatus } from '../InvoiceStatus/invoiceStatus';

export const columns = [
  {
    Header: 'Time',
    accessor: 'modified',
    Cell: (props) => timestampToDate(props.value),
  },
  {
    Header: 'Status',
    accessor: 'json.status',
    Cell: (props) => <InvoiceStatus status={props.value} />,
  },
  {
    Header: 'Amount',
    accessor: 'json.amount',
    Cell: (props) => (
      <div>
        {intlNum(props.value)}{' '}
        {props.row.values.ticker == '0' ? 'NXS' : props.row.values.ticker}
      </div>
    ),
  },
  {
    Header: 'Reference',
    accessor: 'json.reference',
    Cell: (props) => <div>{props.value}</div>,
  },
  {
    Header: 'Sender Detail',
    accessor: 'json.sender_detail',
  },

  // {
  //   Header: 'Account Payable',
  //   accessor: 'json.account',
  //   Cell: (props) => (
  //     <NE_CopyText value={props.value} link={`/scan/${props.value}`} />
  //   ),
  // },
  // {
  //   Header: 'Recipient',
  //   accessor: 'json.recipient',
  //   Cell: (props) => (
  //     <NE_CopyText value={props.value} link={`/scan/${props.value}`} />
  //   ),
  // },
];
