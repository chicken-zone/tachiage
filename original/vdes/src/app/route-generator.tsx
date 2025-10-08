import React from 'react';
import { Route } from 'react-router-dom';
import { type RouteConfig } from './route-helpers';

export const generateRoutes = (routes: RouteConfig[]): React.ReactElement[] => {
  return routes.map((route, index) => {
    const key = `${route.path}-${index}`;
    
    if (route.index) {
      return (
        <Route 
          key={key}
          index 
          element={<route.element />} 
        />
      );
    }
    
    if (route.children) {
      return (
        <Route 
          key={key}
          path={route.path} 
          element={<route.element />}
        >
          {generateRoutes(route.children)}
        </Route>
      );
    }
    
    return (
      <Route 
        key={key}
        path={route.path} 
        element={<route.element />} 
      />
    );
  });
};