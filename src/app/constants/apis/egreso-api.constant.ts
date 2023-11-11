import { DomainConstant } from "../domain/domain.constant";

export class EgresoApiConstant {

  /** URI GATEWAY */
  public static readonly URI_GATEWAY = DomainConstant.URI_GATEWAY;

  public static readonly PATH_EGRESOS = '/egresosP'

  /** URL para los servicios de productos */
  public static readonly URL_EGRESOS: string =
  EgresoApiConstant.URI_GATEWAY +
  EgresoApiConstant.PATH_EGRESOS

  /** URL para los servicios de productos */
  public static readonly URL_EGRESOS_FILTER: string =
  EgresoApiConstant.URI_GATEWAY +
  EgresoApiConstant.PATH_EGRESOS +
  '/filter';


}
