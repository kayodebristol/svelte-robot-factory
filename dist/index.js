import { writable } from 'svelte/store';
import { interpret } from 'robot3';
export function useMachine(machine, event) {
    var _a = writable(interpret(machine, function (service) { return set(service); }, event)), subscribe = _a.subscribe, set = _a.set;
    return { subscribe: subscribe };
}
