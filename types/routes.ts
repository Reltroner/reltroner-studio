export interface AppRouteItem {
  name: string;
  path: string;
  group?: string;
  description?: string;
  category?: string;
  tags?: string[];
}

export interface NavigationItem {
  name: string;
  href: string;
}