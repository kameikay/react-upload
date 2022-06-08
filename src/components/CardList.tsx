/* eslint-disable react/jsx-no-bind */
import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

export interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const [imgUrl, setImgUrl] = useState<string>('');
  const { onClose, isOpen, onToggle } = useDisclosure();

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  function handleViewImage(url: string) {
    onToggle();
    setImgUrl(url);
  }

  return (
    <>
      <SimpleGrid columns={3} spacing="40px">
        {cards &&
          cards.map(card => (
            <Card key={card.id} data={card} viewImage={handleViewImage} />
          ))}
      </SimpleGrid>

      <ModalViewImage isOpen={isOpen} imgUrl={imgUrl} onClose={onClose} />
    </>
  );
}
