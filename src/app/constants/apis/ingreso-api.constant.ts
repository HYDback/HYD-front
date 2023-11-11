import { DomainConstant } from "../domain/domain.constant";

export class IngresoApiConstant {

  /** URI GATEWAY */
  public static readonly URI_GATEWAY = DomainConstant.URI_GATEWAY;

  public static readonly PATH_INGRESOS = '/ingresosP'

  /** URL para los servicios de productos */
  public static readonly URL_INGRESOS: string =
  IngresoApiConstant.URI_GATEWAY +
  IngresoApiConstant.PATH_INGRESOS

  /** URL para los servicios de productos */
  public static readonly URL_INGRESOS_FILTER: string =
  IngresoApiConstant.URI_GATEWAY +
  IngresoApiConstant.PATH_INGRESOS +
  '/filter';


}
