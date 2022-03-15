import { interpret } from "robot3";
import { writable } from "svelte/store";
export function useMachine(machine, event) {
    var _a = writable(interpret(machine, function (service) { return set(service); }, event)), subscribe = _a.subscribe, set = _a.set;
    return { subscribe: subscribe };
}
