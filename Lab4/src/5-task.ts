// 5. Напишіть власну реалізацію класу EventEmitter (Publisher/Subscriber), який поводитиметься так:
//
//     const emitter = new MyEventEmitter();
// emitter.registerHandler('userUpdated', () => console.log('Обліковий запис користувача оновлено'));
// emitter.emitEvent('userUpdated'); // Обліковий запис користувача оновлено

type Listener = () => void;



class EventEmitter {
    private events: Map<string, Array<Listener>>;
    private listenerToOnceListener: Map<Listener, Listener>;

    constructor() {
        this.events = new Map();
        this.listenerToOnceListener = new Map();
    }

    on(event: string, listener: Listener): void {
        const listeners: Array<Listener> | undefined = this.events.get(event);
        if (listeners) listeners.push(listener);
        else this.events.set(event, [listener]);
    };

    emit(event: string): void {
        const listeners: Listener[] | undefined = this.events.get(event);
        if(listeners) listeners.forEach(listener => listener())
    };

    once(event: string, listener: Listener): void {
        const onceListener = (): ReturnType<Listener> => {
            this.remove(event, onceListener);
            listener();
        };
        this.listenerToOnceListener.set(listener, onceListener);
        this.on(event, onceListener);
    };

    remove(event: string, listener: Listener): void {
        const listeners: Array<Listener> | undefined = this.events.get(event);
        if(!listeners) return;
        this.internalRemove(event, listener, listeners);
    };

    private internalRemove(event: string, listener: Listener, listeners: Array<Listener>): void{
        const onceListener: Listener | undefined = this.listenerToOnceListener.get(listener);
        if(onceListener) this.events.delete(event);
        let fn: Listener = onceListener || listener;
        const index = listeners.indexOf(fn);
        if(index !== -1) listeners.splice(index, 1);
        if(!event.length) this.events.delete(event);
    }

    clear(event?: string): void {
        if(event){
            const listeners: Array<Listener> | undefined = this.events.get(event);
            if(!listeners) return;
            listeners.forEach(listener => {
                this.internalRemove(event, listener, listeners);
            });
            this.events.delete(event);
        } else {
            this.events.clear();
            this.listenerToOnceListener.clear();
        }

    };

    count(event: string): number | undefined {
        const listeners: Array<Listener> | undefined = this.events.get(event);
        if(listeners) return listeners.length;
    };

    listeners(event: string): Listener[] | undefined {
        const listeners: Array<Listener> | undefined = this.events.get(event);
        if(listeners) return listeners
    };

    names(): string[] {
        return [...this.events.keys()];
    };

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


// const emitter = new EventEmitter();

