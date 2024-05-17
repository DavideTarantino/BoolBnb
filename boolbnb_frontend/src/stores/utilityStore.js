
import { defineStore } from 'pinia'

export const useUtilityStore = defineStore('utility_store', {
    state: () => ({
        show_filters: false,
        show_map: false,
        showMessageHost: false,
        success: false,
        showMessageFeedback: false,
        show_login: false,
        show_register: false,
        show_messages: true
    }),
    getters: {

    },
    actions: {
        createSlug(title) {
            return title
                .toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^\w\-]+/g, '')
                .replace(/\-\-+/g, '-')
                .replace(/^-+/, '')
                .replace(/-+$/, '');
        },



    },
})