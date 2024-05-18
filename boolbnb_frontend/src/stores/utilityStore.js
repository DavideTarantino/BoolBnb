
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
        show_messages: true,
        showReservationPopup: false
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
        convertDate(dateString) {
            const date = new Date(dateString);
            const day = date.getDate();
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const month = monthNames[date.getMonth()];
            const hours = date.getHours();
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const formattedDate = `${day} ${month} ${hours}:${minutes}`;

            return formattedDate;
        }



    },
})