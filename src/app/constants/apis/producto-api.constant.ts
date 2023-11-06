import { DomainConstant } from "../domain/domain.constant";

export class ProductApiConstant {

  /** URI GATEWAY */
  public static readonly URI_GATEWAY = DomainConstant.URI_GATEWAY;

  public static readonly PATH_PRODUCTS = '/products'

  /** URL para los servicios de productos */
  public static readonly URL_PRODUCTS: string =
  ProductApiConstant.URI_GATEWAY +
  ProductApiConstant.PATH_PRODUCTS

  /** URL para los servicios de productos */
  public static readonly URL_PRODUCTS_FILTER: string =
  ProductApiConstant.URI_GATEWAY +
  ProductApiConstant.PATH_PRODUCTS +
  '/filter';


}
