import {
  HiOutlineAnnotation,
  HiOutlineChartBar,
  HiOutlineClipboardList,
  HiOutlineHeart,
  HiOutlineReceiptTax,
  HiOutlineShoppingCart,
  HiOutlineViewBoards,
} from 'react-icons/hi';

export const DASHBOARD_URLS = [
  {
    category: 'Business',
    items: [
      {
        title: 'Dashboard',
        path: '/dashboard',
        icon: HiOutlineChartBar,
      },
    ],
  },
  {
    category: 'Operation',
    items: [
      {
        title: 'Subscription Plan',
        path: '/dashboard/subscriptions',
        icon: HiOutlineShoppingCart,
      },
    ],
  },
  {
    category: 'Management',
    items: [
      {
        title: 'Meal Plans',
        path: '/dashboard/plans',
        icon: HiOutlineReceiptTax,
      },
      {
        title: 'Recipes',
        path: '/dashboard/recipes',
        icon: HiOutlineClipboardList,
      },
      {
        title: 'Ingredients',
        path: '/dashboard/ingredients',
        icon: HiOutlineViewBoards,
      },
      {
        title: 'Preferences',
        path: '/dashboard/preferences',
        icon: HiOutlineHeart,
      },
      {
        title: 'Allergies',
        path: '/dashboard/allergies',
        icon: HiOutlineAnnotation,
      },
    ],
  },
];
