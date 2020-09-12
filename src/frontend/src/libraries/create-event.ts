export function createEvent(eventName: string): Event | null {
  // polyfill
  if (typeof Event === 'function') {
    return new Event(eventName);
  }

  if (!global?.document) return null;

  const event = document.createEvent('Event');
  event.initEvent(eventName, true, true);
  return event;
}
