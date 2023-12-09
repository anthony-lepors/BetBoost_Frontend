// Utilities
import { createPinia } from 'pinia'

// export default createPinia()

import piniaPluginPersistedState from 'pinia-plugin-persistedstate';
const pinia = createPinia();
pinia.use(piniaPluginPersistedState);

export default pinia;
