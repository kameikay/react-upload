import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

interface IData {
  description: string;
  title: string;
  id: string;
  ts: number;
  url: string;
}

interface IPage {
  after: string | null;
  data: IData[];
}

export default function Home(): JSX.Element {
  async function fetchData({ pageParam = null }): Promise<IPage> {
    if (pageParam) {
      const response = await api.get(`/images?after=${pageParam}`);
      return response.data;
    }
    const response = await api.get('/images');
    return response.data;
  }

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('images', fetchData, {
    getNextPageParam: lastPage => lastPage.after,
  });

  const formattedData = useMemo(() => {
    if (data) {
      const mappedData = data.pages.map(page => page.data);
      const flattedData = mappedData.flat();

      return flattedData;
    }

    return [];
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />

        {hasNextPage && !isFetchingNextPage && (
          <Button
            colorScheme="orange"
            onClick={() => fetchNextPage()}
            mt="40px"
          >
            Carregar mais
          </Button>
        )}

        {isFetchingNextPage && (
          <Button colorScheme="orange" mt="40px">
            Carregando...
          </Button>
        )}
      </Box>
    </>
  );
}
