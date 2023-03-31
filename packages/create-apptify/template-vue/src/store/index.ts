import { createPinia } from 'pinia';
export * from './module-app'

const store = createPinia();

console.log(store);

export { store };
