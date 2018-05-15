export default [
  { 'header': 'Admin' },
  { 'href': '/', 'title': 'Home', 'icon': 'home' },
  { 'href': '/crud/types', 'title': 'Watchdogs', 'icon': 'view_list' },
  { 'href': '/crud/posts', 'title': 'Incidents', 'icon': 'view_list' },
  { 'href': '/crud/posts/create', 'title': 'Add Incident', 'icon': 'note_add' },

  { 'href': '/crud/billing', 'title': 'Billing', 'icon': 'view_list' },
  { 'href': '/crud/users', 'title': 'Users', 'icon': 'people' },

  //{ 'href': '/chat', 'title': 'Chat', 'icon': 'chat' },
  {
    'title': 'Help',
    'icon': 'domain',
    'items': [
      { 'href': '/example', 'title': 'Example' },
      { 'href': '/about', 'title': 'About' }
    ]
  },
  { divider: true },
  { 'header': 'System' },
  { 'href': '/settings', 'title': 'Settings', 'icon': 'settings' },

  { 'href': '/login', 'icon': 'lock', 'title': 'Logout' }
]
