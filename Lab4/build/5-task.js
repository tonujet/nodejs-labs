"use strict";
class EventEmitter {
    constructor() {
        this.events = new Map();
        this.listenerToOnceListener = new Map();
    }
    on(event, listener) {
        const listeners = this.events.get(event);
        if (listeners)
            listeners.push(listener);
        else
            this.events.set(event, [listener]);
    }
    ;
    emit(event) {
        const listeners = this.events.get(event);
        if (listeners)
            listeners.forEach(listener => listener());
    }
    ;
    once(event, listener) {
        const onceListener = () => {
            this.remove(event, onceListener);
            listener();
        };
        this.listenerToOnceListener.set(listener, onceListener);
        this.on(event, onceListener);
    }
    ;
    remove(event, listener) {
        const listeners = this.events.get(event);
        if (!listeners)
            return;
        this.internalRemove(event, listener, listeners);
    }
    ;
    internalRemove(event, listener, listeners) {
        const onceListener = this.listenerToOnceListener.get(listener);
        if (onceListener)
            this.events.delete(event);
        let fn = onceListener || listener;
        const index = listeners.indexOf(fn);
        if (index !== -1)
            listeners.splice(index, 1);
        if (!event.length)
            this.events.delete(event);
    }
    clear(event) {
        if (event) {
            const listeners = this.events.get(event);
            if (!listeners)
                return;
            listeners.forEach(listener => {
                this.internalRemove(event, listener, listeners);
            });
            this.events.delete(event);
        }
        else {
            this.events.clear();
            this.listenerToOnceListener.clear();
        }
    }
    ;
    count(event) {
        const listeners = this.events.get(event);
        if (listeners)
            return listeners.length;
    }
    ;
    listeners(event) {
        const listeners = this.events.get(event);
        if (listeners)
            return listeners;
    }
    ;
    names() {
        return [...this.events.keys()];
    }
    ;
}
const emitter = new EventEmitter();
emitter.on('userUpdated', () => console.log('Обліковий запис користувача оновлено'));
emitter.on('userUpdated', () => console.log('Обліковий запис користувача оновлено'));
emitter.once('userCreated', () => console.log('Обліковий запис користувача створено'));
emitter.emit('userUpdated');
emitter.emit('userCreated');
emitter.emit('userCreated');
emitter.emit('userCreated');
console.log('listeners', emitter.listeners('userCreated'));
console.log('listeners', emitter.listeners('userUpdated'));
console.log('names', emitter.names());
emitter.clear();
console.log('names', emitter.names());
