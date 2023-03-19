
import { interpret, Machine } from "robot3";
import { writable } from "svelte/store";
export function useMachine<E>(
  machine: Machine,
  event: { [K in keyof E]: any }
): any {
  const { subscribe, set } = writable(
    interpret(machine, (service) => set(service), event)
  );
  return { subscribe };
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