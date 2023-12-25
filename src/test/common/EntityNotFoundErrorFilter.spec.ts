import { EntityNotFoundErrorFilter } from '../../common/filters/EntityNotFoundErrorFilter';
import { EntityNotFoundError } from 'typeorm';
import { HttpStatus } from '@nestjs/common';
import {
  mockArgumentsHost,
  mockHttpArgumentsHost,
} from '../util/entity.filter.const';

describe('EntityNotFoundErrorFilter', () => {
  it('should catch an EntityNotFoundError and respond with 404 status', () => {
    const filter = new EntityNotFoundErrorFilter();
    const error = new EntityNotFoundError('TestEntity', 'TestCriteria');

    filter.catch(error, mockArgumentsHost);

    const response = mockHttpArgumentsHost.getResponse();
    expect(response.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
    expect(response.status().json).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'An entity with the given id is not Found',
      }),
    );
  });
});
