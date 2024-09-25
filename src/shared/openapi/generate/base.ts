/* tslint:disable */

/* eslint-disable */

/**
 * Social Network API
 * API for a social network service
 *
 * The version of the OpenAPI document: 1.0.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
// Some imports not used depending on template conditions
// @ts-ignore
import type { AxiosInstance, AxiosPromise, RawAxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
import { axiosInstance } from 'shared/axios/instance';

import type { Configuration } from './configuration';

export const BASE_PATH =
  'https://kdt.frontend.5th.programmers.co.kr:5011'.replace(/\/+$/, '');

/**
 *
 * @export
 */
export const COLLECTION_FORMATS = {
  csv: ',',
  ssv: ' ',
  tsv: '\t',
  pipes: '|',
};

/**
 *
 * @export
 * @interface RequestArgs
 */
export interface RequestArgs {
  url: string;
  options: RawAxiosRequestConfig;
}

/**
 *
 * @export
 * @class BaseAPI
 */
export class BaseAPI {
  protected configuration: Configuration | undefined;

  constructor(
    configuration?: Configuration,
    protected basePath: string = BASE_PATH,
    protected axios: AxiosInstance = globalAxios,
  ) {
    if (configuration) {
      this.configuration = configuration;
      this.basePath = configuration.basePath ?? basePath;
      this.axios = axiosInstance;
    }
  }
}

/**
 *
 * @export
 * @class RequiredError
 * @extends {Error}
 */
export class RequiredError extends Error {
  constructor(
    public field: string,
    msg?: string,
  ) {
    super(msg);
    this.name = 'RequiredError';
  }
}

interface ServerMap {
  [key: string]: {
    url: string;
    description: string;
  }[];
}

/**
 *
 * @export
 */
export const operationServerMap: ServerMap = {};
