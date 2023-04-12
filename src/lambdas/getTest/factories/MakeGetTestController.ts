import {GetTestUseCase} from '../domain/GetTestUseCase';
import {GetTestController} from '../ports/controllers/GetTestController';
import {GetTestRepository} from '../ports/repositories/GetTestRepository';

export function makeGetTestController() {
  const repository = new GetTestRepository();
  const useCase = new GetTestUseCase(repository);
  const controller = new GetTestController(useCase);

  return controller;
}
