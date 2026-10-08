const APP_URL = '/organiza-qm/';
self.addEventListener('push', event => {
  let data = {};
  try { data = event.data ? event.data.json() : {}; } catch { data = { body: event.data?.text?.() || '' }; }
  event.waitUntil(self.registration.showNotification(data.title || 'Organiza QM · Nueva tarea', {
    body: `${data.author || 'Equipo QM'}: ${data.body || data.text || 'Tenés una nueva tarea del equipo.'}`,
    icon: APP_URL + 'logo-qm.png', badge: APP_URL + 'logo-qm.png', tag: 'organiza-' + (data.id || Date.now()), renotify: true, data: { url: APP_URL },
  }));
});
self.addEventListener('notificationclick', event => { event.notification.close(); event.waitUntil(clients.openWindow(event.notification.data?.url || APP_URL)); });
