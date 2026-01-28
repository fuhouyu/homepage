import React from 'react';
import * as Icons from '@ant-design/icons';
import { NavLink, NavWrapper } from '@/components/Navigation/style';
import navData from '@/assets/nav-config.json';

type IconName = keyof typeof Icons;

interface NavItem {
  name: string;
  url: string;
  icon: string;
}

export const NavigationCard: React.FC = () => {
  return (
    <NavWrapper>
      {navData.navigation.map((item: NavItem) => {
        const iconName = item.icon as IconName;
        const IconComponent = (Icons[iconName] as React.ElementType) || Icons.GlobalOutlined;

        return (
          <NavLink key={item.name} href={item.url} target="_blank">
            <IconComponent />
            <span>{item.name}</span>
          </NavLink>
        );
      })}
    </NavWrapper>
  );
};
