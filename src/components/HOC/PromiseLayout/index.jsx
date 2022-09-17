import ErrorMessage from 'components/common/NE_ErrorMessage';
import Loader from 'components/common/NE_Loader';
import { Fragment } from 'react';
import TYPES from 'types';
import Logger from 'utils/customLog';

export default function PromiseLayout(props) {
  const {
    children = <></>,
    error = {},
    isError = false,
    isLoading = false,
    loaderType = TYPES.LOADER.CIRCLE,
  } = props;

  Logger.log('[PromiseLayout] ==>', {
    error,
    isError,
    isLoading,
    loaderType,
  });

  return (
    <Fragment>
      {isLoading && (
        <div className={'center-loader'}>
          <Loader type={loaderType} size="5rem" />
        </div>
      )}
      {isError && <ErrorMessage error={error} />}
      {!isLoading && !isError && children}
    </Fragment>
  );
}
