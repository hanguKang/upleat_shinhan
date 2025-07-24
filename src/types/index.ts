export interface AppIconData {
  id: string;
  icon: string;
  label: string;
  isActive?: boolean;
  customContent?: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  isActive?: boolean;
}

export interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export interface HeaderProps {
  navigationItems: NavigationItem[];
}

export interface MainContentProps {
  title: string;
  children: React.ReactNode;
}

export interface AppIconProps extends AppIconData {
  size?: 'small' | 'medium' | 'large';
}
