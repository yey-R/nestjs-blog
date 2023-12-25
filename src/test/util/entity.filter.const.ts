import { ArgumentsHost } from '@nestjs/common';

const mockGetRequest = {
  url: '/test-url',
};

const mockJson = {
  json: jest.fn(),
};

const mockGetResponse = {
  status: jest.fn().mockReturnValue(mockJson),
};

export const mockHttpArgumentsHost = {
  getResponse: () => mockGetResponse,
  getRequest: () => mockGetRequest,
};

export const mockArgumentsHost = {
  switchToHttp: () => mockHttpArgumentsHost,
} as unknown as ArgumentsHost;
