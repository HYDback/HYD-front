import { DomainConstant } from "../domain/domain.constant";

export class CategoryApiConstant {

  /** URI GATEWAY */
  public static readonly URI_GATEWAY = DomainConstant.URI_GATEWAY;

  public static readonly PATH_CATEGORIES = '/categories'

  /** URL para los servicios de categorias */
  public static readonly URL_CATEGORIES: string =
  CategoryApiConstant.URI_GATEWAY +
  CategoryApiConstant.PATH_CATEGORIES

  /** URL para los servicios de categorias */
  public static readonly URL_CATEGORIES_FILTER: string =
  CategoryApiConstant.URI_GATEWAY +
  CategoryApiConstant.PATH_CATEGORIES +
  '/filter';

}
