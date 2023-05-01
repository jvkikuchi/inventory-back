import {APIGatewayEvent} from 'aws-lambda';
import {Controller, UseCase} from '../../../common/interfaces';
import {DeleteSupplierRepository} from '../ports/repositories/DeleteSupplierRepository';

export class DeleteSupplierUseCase implements UseCase<number, void> {}
