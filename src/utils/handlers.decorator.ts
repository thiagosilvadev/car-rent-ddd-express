// src/utils/handlers.decorator.ts
import { MetadataKeys } from './metadata.keys';
export enum Methods {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
}
export interface IRouter {
  method: Methods;
  path: string;
  isPublic: boolean;
  handlerName: string | symbol;
}
const methodDecoratorFactory = (method: Methods) => {
  return (path: string = "", config?: {
    isPublic?: boolean;
  }): MethodDecorator => {
    return (target, propertyKey) => {
      const controllerClass = target.constructor;
      const routers: IRouter[] =   Reflect.hasMetadata(MetadataKeys.ROUTERS, controllerClass) ?
        Reflect.getMetadata(MetadataKeys.ROUTERS, controllerClass) : [];
      routers.push({
        method,
        path,
        isPublic: config?.isPublic ?? false,
        handlerName: propertyKey,
      });
      Reflect.defineMetadata(MetadataKeys.ROUTERS, routers, controllerClass);
    }
  }
}

export const PublicRoute = (): MethodDecorator => {
  return (target, propertyKey) => {
    const controllerClass = target.constructor;
    Reflect.defineMetadata(MetadataKeys.IS_PUBLIC, {
      isPublic: true,
    }, controllerClass);
  }
}


export const Get = methodDecoratorFactory(Methods.GET);
export const Post = methodDecoratorFactory(Methods.POST);
export const Put = methodDecoratorFactory(Methods.PUT);
export const Delete = methodDecoratorFactory(Methods.DELETE);