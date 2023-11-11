import { DomainConstant } from "../domain/domain.constant";

export class OperadorApiConstant {

  /** URI GATEWAY */
  public static readonly URI_GATEWAY = DomainConstant.URI_GATEWAY;

  public static readonly PATH_OPERADORES = '/users'

  /** URL para los servicios de productos */
  public static readonly URL_OPERADORES: string =
  OperadorApiConstant.URI_GATEWAY +
  OperadorApiConstant.PATH_OPERADORES

  /** URL para los servicios de productos */
  public static readonly URL_OPERADORES_FILTER: string =
  OperadorApiConstant.URI_GATEWAY +
  OperadorApiConstant.PATH_OPERADORES +
  '/filter';


}
