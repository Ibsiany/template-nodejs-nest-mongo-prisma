import { CreateAndSaveCardDTO } from '../../dtos/request/create-card-request.dto';
import { FindAllCardsDTO } from '../../dtos/request/find-all-cards-request.dto';
import { CardEntityInterface } from '../../interfaces/card-entity.interface';

export interface CardRepositoryInterface {
  createAndSave(card: CreateAndSaveCardDTO): Promise<CardEntityInterface>;
  updateAndSave(user: CardEntityInterface): Promise<CardEntityInterface>;
  findById(id: string): Promise<CardEntityInterface | null>;
  findAll(query: FindAllCardsDTO): Promise<CardEntityInterface[]>;
  deleteCard(user: CardEntityInterface): Promise<void>;
}
