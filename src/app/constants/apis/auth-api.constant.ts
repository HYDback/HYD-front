import { environment } from "src/environments/environment.dev";
import { DomainConstant } from "../domain/domain.constant";

export class AuthApiConstant {

  /** URI GATEWAY */
  public static readonly URI_GATEWAY = DomainConstant.URI_GATEWAY;

  public static readonly PATH_USERS = '/users'

  /** URL para el servicio de signin */
  public static readonly URL_SIGNIN: string =
  AuthApiConstant.URI_GATEWAY +
  AuthApiConstant.PATH_USERS +
  '/signin';

  /** URL para el servicio de verificar token */
  public static readonly URL_VERIFY_TOKEN: string =
  AuthApiConstant.URI_GATEWAY +
  AuthApiConstant.PATH_USERS +
  '/verify';

}
