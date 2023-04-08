import { Repository } from "../../../../common/interfaces";

export type GetTestDTO = {
  name: string;
};

export class GetTestRepository implements Repository<GetTestDTO, string> {
  async exec(param: GetTestDTO) {
    const test = `Hello ${param.name}!`;

    return test;
  }
}
