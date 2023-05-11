import {PrismaClient} from '@prisma/client';
import {PaymentMethodStatisticsController} from '../ports/controllers/PaymentMethodStatisticsController';
import {ListSellsRepository} from '../../../common/repositories/ListSellsRepository';
import {PaymentMethodStatisticsUseCase} from '../domain/PaymentMethodStatisticUseCase';

export function makePaymentMethodStatistics() {
  const prismaClient = new PrismaClient();

  const listSellsRepository = new ListSellsRepository(prismaClient);
  const paymentMethodStatisticsUseCase = new PaymentMethodStatisticsUseCase(
    listSellsRepository,
  );
  const paymentMethodStatisticsController =
    new PaymentMethodStatisticsController(paymentMethodStatisticsUseCase);

  return paymentMethodStatisticsController;
}
