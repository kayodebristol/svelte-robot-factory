import { writable } from 'svelte/store';
import { interpret } from 'robot3';

export function useMachine(machine, event) {
    
    const {subscribe, set} = writable(
        interpret(machine, service => set(service), event)
    )
    return {subscribe};
}