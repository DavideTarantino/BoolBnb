<template>
    <div class="flex flex-col h-screen">
        <header>
            <NavBar />
        </header>
        <div class="messages-container w-full flex h-full overflow-y-auto overflow-x-hidden">
            <div class="messages-left w-1/4 h-full max-h-full overflow-y-auto">
                <div v-if="api_store.user_messages?.received.length == 0"
                    class="flex flex-col gap-1 py-12 items-center">
                    <i class="fa-solid fa-comments text-3xl mb-4"></i>
                    <span class="text-xl font-semibold text-gray-950">
                        You didn't receive any message yet
                    </span>
                    <span class="text-base text-gray-600">
                        New messages will be displayed here
                    </span>
                </div>
                <div v-else class="border-t-0 overflow-x-hidden max-h-full">
                    <div v-for="(message, index) in api_store.user_messages?.received" :key="message.id"
                        class="flex justify-between px-6 h-[80px] border-b-2 cursor-pointer hover:bg-gray-800 hover:text-white items-center"
                        @click="changeActiveMessage(index)">
                        <div>
                            <div class="font-bold">
                                {{ message.name }}
                            </div>
                            <div class="message-preview">
                                {{ message.content }}
                            </div>
                        </div>
                        <div class="font-semibold text-sm">
                            {{ utility_store.convertDate(message.created_at) }}
                        </div>


                    </div>
                </div>
            </div>
            <div class="messages-right w-3/4 border-0 h-full">
                <div class="border border-t-0  border-[#EBEBEB] rounded-lg">
                    <div class="container flex justify-between mx-4 items-center h-[79px]">
                        <div class="mb-2">
                            <h1 class="font-bold my-1">From: <span class="font-normal ms-2"></span>
                            </h1>
                            <p class="email">{{ active_message.name }}</p>
                        </div>

                        <div class="mr-8">
                            <h1 class="font-bold my-1">Date: </h1>
                            <p>{{
                                utility_store.convertDate(active_message.created_at) }}</p>
                        </div>
                    </div>

                    <hr class="mb-4">

                    <div class="mx-4 ">
                        <h1 class="font-bold">Message:</h1>
                        <p class="flex-grow h-[500px] py-10">
                            {{ active_message.content }}
                        </p>

                    </div>


                    <div class="reply flex items-center gap-2 ms-auto w-fit cursor-pointer me-6 mb-6" id="reply-icon"
                        @click="showForm()">
                        <span class="text-lg font-semibold">
                            Reply to this message
                        </span>
                        <i class="fa-solid fa-reply text-2xl"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="message-host-container fixed w-full h-full"
            v-show="utility_store.showMessageHost || utility_store.showMessageFeedback">
            <MessageHost :accomodation_id="active_message.accomodation_id" :recipient_name="active_message.name">
            </MessageHost>
            <MessageFeedback v-show="utility_store.showMessageFeedback"
                class="message-host-overlay overlay-mask w-full h-full" />

        </div>

    </div>

</template>

<script>

import NavBar from '../components/NavBar.vue'
import MessageHost from '@/components/MessageHost.vue'
import MessageFeedback from '@/components/MessageFeedback.vue'
import { useApiStore } from '../stores/apiStore'
import { useUtilityStore } from '@/stores/utilityStore'


export default {
    data() {
        return {
            api_store: useApiStore(),
            utility_store: useUtilityStore(),
            active_message: 0,
        }
    },
    components: { NavBar, MessageHost, MessageFeedback },
    computed: {
        active_message() {
            return this.api_store.user_messages.received[this.active_message];
        }
    },
    methods: {
        changeActiveMessage(index) {
            this.active_message = index
        },
        showForm() {
            this.utility_store.showMessageHost = true
        }
    }
}
</script>

<style scoped>
/* .messages-container {
    height: calc(100vh - 115px);
} */

.message-host-container {
    inset: 0;
    background-color: rgba(50, 50, 50, 0.7);
}

.message-preview {
    max-width: 250px;
    /* Adjust this value as needed */
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>