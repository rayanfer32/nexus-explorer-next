import ErrorMessage from 'components/common/NE_ErrorMessage';
import Loader from 'components/common/NE_Loader';
import { Fragment } from 'react';
import TYPES from 'types';

export default function PromiseLayout(props) {
  const {
    children = <></>,
    error = {},
    isError = false,
    isLoading = false,
    loaderType = TYPES.LOADER.CIRCLE,
    loaderSize = '5rem',
  } = props;

  return (
    <Fragment>
      {isLoading && (
        <div className={'center-loader'}>
          <Loader type={loaderType} size={loaderSize} />
        </div>
      )}
      {isError && <ErrorMessage error={error} />}
      {!isLoading && !isError && children}
    </Fragment>
  );
}
