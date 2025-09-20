const menuItems = {
  items: [
    {
      id: 'navigation',
      title: 'Navigation',
      type: 'group',
      icon: 'icon-navigation',
      children: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          type: 'item',
          icon: 'feather icon-home',
          url: '/app/dashboard/analytics'
        },
        {
          id: 'product',
          title: 'Product List',
          type: 'item',
          icon: 'feather icon-list',
          url: '/app/product/analytics'
        },
        {
          id: 'user',
          title: 'User List',
          type: 'item',
          icon: 'feather icon-users',
          url: '/app/user/analytics'
        },
        {
          id: 'seller',
          title: 'Seller List',
          type: 'item',
          icon: 'feather icon-briefcase',
          url: '/app/seller/analytics'
        },
        {
          id: 'transation',
          title: 'Transation Data',
          type: 'item',
          icon: 'feather icon-credit-card',
          url: '/app/transation/analytics'
        },
        {
          id: 'qr',
          title: 'QR-CODE Data',
          type: 'item',
          icon: 'feather icon-grid',
          url: '/app/qrcode/analytics'
        }
      ]
    }
  ]
};

export default menuItems;
