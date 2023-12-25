import { EntityNotFoundErrorFilter } from '../../common/filters/EntityNotFoundErrorFilter';
import { EntityNotFoundError } from 'typeorm';
import { ArgumentsHost, HttpStatus } from '@nestjs/common';

const mockGetRequest = {
  url: '/test-url',
};

const mockJson = {
  json: jest.fn(),
};

const mockGetResponse = {
  status: jest.fn().mockReturnValue(mockJson),
};

const mockHttpArgumentsHost = {
  getResponse: () => mockGetResponse,
  getRequest: () => mockGetRequest,
};

const mockArgumentsHost = {
  switchToHttp: () => mockHttpArgumentsHost,
} as unknown as ArgumentsHost;

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
