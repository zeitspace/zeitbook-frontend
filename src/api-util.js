import * as idbKeyval from 'idb-keyval';
import clone from 'lodash/clone';

function getQueue(queueName) {
  // eslint-disable-next-line no-undef
  return idbKeyval.get(queueName).then(val => val || []);
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

export {
  addToQueue,
  json,
};
