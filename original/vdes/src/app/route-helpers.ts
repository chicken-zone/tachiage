import React from 'react';

// カスタムルート設定タイプ
export interface RouteConfig {
  path: string;
  element: React.ComponentType;
  index?: boolean;
  children?: RouteConfig[];
}

// ルート設定ヘルパー関数
export const route = (path: string, component: React.ComponentType, children?: RouteConfig[]): RouteConfig => ({
  path,
  element: component,
  children
});

export const index = (component: React.ComponentType): RouteConfig => ({
  path: "",
  element: component,
  index: true
});

export const layout = (component: React.ComponentType, children: RouteConfig[]): RouteConfig => ({
  path: "",
  element: component,
  children
});

export const prefix = (pathPrefix: string, routes: RouteConfig[]): RouteConfig[] => {
  return routes.map(route => ({
    ...route,
    path: route.path ? `${pathPrefix}/${route.path}` : pathPrefix
  }));
};