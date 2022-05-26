export const getId = () => Math.random().toString(36).slice(2, 10);
export const makeArrayPayload = (value :unknown | unknown [])=> Array.isArray(value) ? value : [value];