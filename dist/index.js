import { interpret } from "robot3";
import { writable } from "svelte/store";
export function useMachine(machine, event) {
    var _a = writable(interpret(machine, function (service) { return set(service); }, event)), subscribe = _a.subscribe, set = _a.set;
    return { subscribe: subscribe };
}
/*
import { interpret, Machine } from "robot3";
import { writable, Writable } from "svelte/store";

type Service = Record<string, any>;

export function useMachine<E extends Record<string, unknown>>(
  machine: Machine<Service, E>,
  events: E
): { subscribe: Writable<Service>["subscribe"] } {
  const { subscribe, set } = writable<Service>(
    interpret(machine, ((service) => set(service)), events)
  );

  return { subscribe };
}
*/ 
