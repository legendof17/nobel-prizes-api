import React, { useEffect, useState } from 'react';
import { Container, Grid } from './NobelPrizesList.styles';
import NobelPrizeItem from './NobelPrizeItem';
import NobelPrizeModal from './NobelPrizeModal';
import ErrorState from 'components/ErrorState';
import Loader from 'components/Loader';
import { fetchPrizes } from 'utils/api/nobelPrize';

export default function NobelPrizesList() {
  const [nobelPrizes, setNobelPrizes] = useState([]);
  const [currentNobelPrize, setCurrentNobelPrize] = useState(null);
  const [isError, setIsError] = useState(false);
  const [retryTrigger, setRetryTrigger] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNobelPrizes = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const result = await fetchPrizes({
          year: 1901,
          yearTo: 2018,
        });
        setNobelPrizes(result.prizes);
        setIsLoading(false);
      } catch {
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchNobelPrizes();
  }, [retryTrigger]);

  /**
   * Set the given nobel as the current Nobel Prize when user click on it
   * @param {object} nobelPrize The Nobel Prize to set
   * @returns {void}
   */
  const onNobelPrizeItemClick = (nobelPrize) =>
    setCurrentNobelPrize(nobelPrize);

  /**
   * Hide the Nobel Prize modal
   */
  const onNobelModalCloseClick = () => setCurrentNobelPrize(null);

  /**
   * Retry the Nobel Prizes fetching operation
   */
  const retryFetch = () => setRetryTrigger(!retryTrigger);

  return (
    <Container>
      {isLoading && <Loader />}
      {isError && !isLoading && <ErrorState onRetryClick={retryFetch} />}
      {!isError && !isLoading && (
        <Grid data-testid="nobel-prizes-grid">
          {nobelPrizes.map((nobelPrize, idx) => (
            <NobelPrizeItem
              key={idx}
              item={nobelPrize}
              onItemClick={onNobelPrizeItemClick}
            />
          ))}
        </Grid>
      )}

      {currentNobelPrize && (
        <NobelPrizeModal
          nobelPrize={currentNobelPrize}
          onCloseClick={onNobelModalCloseClick}
        />
      )}
    </Container>
  );
}
