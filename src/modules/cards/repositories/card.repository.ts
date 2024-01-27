import { PrismaService } from '../../../prisma.service';
import { CreateAndSaveCardDTO } from '../dtos/request/create-card-request.dto';
import { FindAllCardsDTO } from '../dtos/request/find-all-cards-request.dto';
import { CardEntityInterface } from '../interfaces/card-entity.interface';
import { CardRepositoryInterface } from './interfaces/card-repository.interface';

export class CardRepository implements CardRepositoryInterface {
  constructor(private prisma: PrismaService) {}

  async createAndSave({
    description,
    status,
    title,
    user_id,
  }: CreateAndSaveCardDTO): Promise<CardEntityInterface> {
    return this.prisma.cards.create({
      data: {
        description,
        status,
        title,
        user_id,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });
  }

  async updateAndSave(card: CardEntityInterface): Promise<CardEntityInterface> {
    return this.prisma.cards.update({
      where: { id: card.id },
      data: card,
    });
  }

  async findById(id: string): Promise<CardEntityInterface | null> {
    return this.prisma.cards.findUnique({ where: { id: id } });
  }

  async findAll({
    id,
    description,
    status,
    title,
    user_id,
  }: FindAllCardsDTO): Promise<CardEntityInterface[]> {
    return this.prisma.cards.findMany({
      where: {
        user: { id: user_id },
        id: id ? { equals: id } : undefined,
        description: description
          ? { contains: description.toLowerCase() }
          : undefined,
        status: status ? { equals: status } : undefined,
        title: title ? { contains: title.toLowerCase() } : undefined,
      },
    });
  }

  async deleteCard(card: CardEntityInterface): Promise<void> {
    await this.prisma.cards.delete({
      where: { id: card.id },
    });
  }
}
