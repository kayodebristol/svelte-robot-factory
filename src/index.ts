import { writable } from 'svelte/store';
import { interpret, Machine } from 'robot3';

interface useMachine<E>{
machine: Machine; 
event?: { [K in keyof E]: any }; 

}


export function useMachine<E>(machine: Machine, event:{ [K in keyof E]: any } ):  any {
    
    const {subscribe, set} = writable(
        interpret(machine, service => set(service), event)
    )
    return {subscribe}
}
