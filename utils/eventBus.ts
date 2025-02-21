// eventBus.ts
type EventCallback = (...args: any[]) => void;

class EventBus {
  private subscribers: { [key: string]: EventCallback[] } = {};

  // 订阅事件
  subscribe(eventName: string, callback: EventCallback) {
    if (!this.subscribers[eventName]) {
      this.subscribers[eventName] = [];
    }
    this.subscribers[eventName].push(callback);

    // 返回取消订阅的函数
    return () => {
      this.unsubscribe(eventName, callback);
    };
  }

  // 取消订阅
  unsubscribe(eventName: string, callback: EventCallback) {
    if (!this.subscribers[eventName]) return;

    this.subscribers[eventName] = this.subscribers[eventName].filter(
      cb => cb !== callback
    );
  }

  // 发布事件
  publish(eventName: string, ...args: any[]) {
    if (!this.subscribers[eventName]) return;

    this.subscribers[eventName].forEach(callback => {
      callback(...args);
    });
  }
}
const eventBus = new EventBus();
// 创建一个全局的事件总线实例
export default eventBus;