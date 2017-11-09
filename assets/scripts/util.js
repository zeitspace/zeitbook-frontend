/* eslint-disable no-undef, no-unused-vars */
function sendMessageToClient(client, msg) {
  return Promise.resolve(client.postMessage(msg));
}

function sendMessageToAllClients(msg) {
  return clients.matchAll({ includeUncontrolled: true, type: 'window' })
    .then(clients => Promise.all(clients.map(client => sendMessageToClient(client, msg))));
}

function hasVisibleClients() {
  return clients.matchAll({ type: 'window', includeUncontrolled: true })
    .then(clientList => clientList.some(client => client.visibilityState === 'visible'));
}

function sendNotification(msg) {
  hasVisibleClients().then(c => (c ? Promise.resolve() : registration.showNotification(msg, {})));
}

function getQueue(queueName) {
  // eslint-disable-next-line no-undef
  return idbKeyval.get(queueName).then(val => val || []);
}

function updateQueue(queueName, postsQueue) {
  // eslint-disable-next-line no-undef
  return idbKeyval.set(queueName, postsQueue);
}

function addToQueue(queueName, obj) {
  const elem = clone(obj);
  return getQueue(queueName).then((elemQueue) => {
    elem.id = elemQueue.length > 0 ? (Math.max(...elemQueue.map(item => item.id)) + 1) : 1;
    elemQueue.push(elem);
    return idbKeyval.set(queueName, elemQueue);
  }).then(() => elem.id);
}

function json(response) {
  if (response.ok) {
    return response.json();
  }
  throw response.status;
}
