import { UseCase } from "../../../common/interfaces";
import { GetTestRepository } from "../ports/repositories/GetTestRepository";

type GetTestInput = {
  name: string;
};

export class GetTestUseCase implements UseCase<GetTestInput, string> {
  constructor(private readonly getTestRepository: GetTestRepository) {}

  async exec(param: GetTestInput) {
    const getTestDTO = {
      name: param.name,
    };

    const test = await this.getTestRepository.exec(getTestDTO);

    return test;
  }
}
