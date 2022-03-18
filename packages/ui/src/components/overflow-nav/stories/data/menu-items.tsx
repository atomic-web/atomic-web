import {
  Home,
  Contact,
  Info,
  Configure,
  Paypal,
  Instagram,
  Amazon,
  Chrome,
  Firefox,
  Edge
} from 'grommet-icons';
import { OverflowNavItemProps } from '../../types';

const menuItems: OverflowNavItemProps[] = [
  {
    icon: Home,
    label: 'Home',
    link: 'http://google.com',
    target: '_blank',
  },
  {
    icon: Contact,
    label: 'Contact',
  },
  {
    icon: Info,
    label: 'Info',
  },
  {
    icon: Configure,
    label: 'Configure',
  },
  {
    icon: Paypal,
    label: 'Paypal',
  },
  {
    icon: Instagram,
    label: 'Instagram',
  },
  {
    icon: Amazon,
    label: 'Amazon',
  },
  {
    icon: Chrome,
    label: 'Chrome',
  },
  {
    icon: Firefox,
    label: 'FireFox',
  },
  {
    icon: Edge,
    label: 'Edge',
  }
];

export default menuItems;
