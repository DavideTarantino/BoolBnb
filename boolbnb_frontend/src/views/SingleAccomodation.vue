<script>
import NavBar from '../components/NavBar.vue'
import { RouterLink, RouterView } from 'vue-router'
import { useApiStore } from '@/stores/apiStore'
import { DatePicker, Calendar } from 'v-calendar'
import 'v-calendar/style.css'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import AdvancedSearch from '@/components/AdvancedSearch.vue'

import { useScreens } from 'vue-screen-utils'
import SingleMapVue from '@/components/SingleMapVue.vue'
import { useMapStore } from '@/stores/mapStore'
import { useUtilityStore } from '@/stores/utilityStore'

import MessageHost from '@/components/MessageHost.vue'
import MessageFeedback from '@/components/MessageFeedback.vue'

const { mapCurrent } = useScreens({ xs: '0px', sm: '640px', md: '768px', lg: '1024px' });
const columns = mapCurrent({ lg: 2 }, 1);



export default {
    name: 'SingleAccomodation',
    data() {
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);
        return {
            api_store: useApiStore(),
            api_reponse: undefined,
            map_store: useMapStore(),
            utility_store: useUtilityStore(),
            date: new Date(),
            route: useRoute(),
            range: {
                start: today,
                end: tomorrow,
            },
        }
    },
    async mounted() {
        if (!this.api_store.tom_api_key) {
            await this.api_store.getApiKey()
        }
        if (!this.api_store.user_ip_address) {
            await this.api_store.getIpAddress()
        }
        await this.api_store.getSingleAccomodation(this.route.params.id)
        console.log(this.api_store.user_ip_address)
        await this.api_store.storeVisual(this.route.params.id, this.api_store.user_ip_address)


    },
    methods: {
        formatDate(date) {
            if (!date || isNaN(date)) {
                return '';
            }
            // Convert milliseconds to a Date object
            const dateObj = new Date(date);
            // Check if the conversion was successful
            if (isNaN(dateObj.getTime())) {
                return '';
            }
            // Extract year, month, and day from the Date object
            const day = dateObj.getDate();
            const month = dateObj.getMonth() + 1; // Months are zero-based
            const year = dateObj.getFullYear();
            // Format the date string
            return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
        },
        toggleMessageHost() {
            this.showMessageHost = !this.MessageHost;
        },
        backToSearch() {
            if (this.api_store.selected_position) {
                this.$router.push('/search')
            } else {
                this.$router.push('/')
            }
        }

    },
    computed: {
        nights() {
            if (!this.range.start || !this.range.end) {
                return 0;
            }
            // Convert start and end dates to milliseconds
            const startDate = new Date(this.range.start).getTime();
            const endDate = new Date(this.range.end).getTime();
            // Calculate the difference in milliseconds
            const difference = endDate - startDate;
            // Convert milliseconds to days
            const days = difference / (1000 * 3600 * 24);
            // Return the number of nights (rounded to the nearest whole number)
            return Math.round(days);
        }
    },

    components: { NavBar, DatePicker, Calendar, SingleMapVue, AdvancedSearch, MessageHost, MessageFeedback },
}
</script>

<template>
    <header>
        <NavBar />
    </header>
    <AdvancedSearch v-show="utility_store.show_filters"></AdvancedSearch>
    <main class="py-12 px-6 lg:pl-32 lg:pr-32 lg:px-16 relative">
        <div class="flex items-center gap-3" @click="backToSearch()">
            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 3.16666L4.66667 8.5L10 13.8333" stroke="#222222" stroke-width="1.77778"
                    stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <h1 class="text-2xl font-medium">{{ api_store.single_accomodation?.title }}</h1>
        </div>


        <!-- THUMB SECTION -->
        <section class="flex gap-1 all-thumbs mt-5 rounded-md overflow-hidden">
            <div class="left-thumbs">
                <img class="main-img" :src="api_store.single_accomodation?.pictures[0]?.url" alt="">
            </div>

            <div class="flex flex-wrap right-thumbs">
                <div v-for="(image, index) in api_store.single_accomodation?.pictures.slice(1, 5)" :key="index"
                    class="right-pictures">
                    <img :src="image.url" alt="">
                </div>
            </div>

        </section>

        <!-- INFO SECTION -->
        <div class="bottom-section flex mt-8">
            <div class="bottom-left w-11/12 md:w-3/5">
                <section class="">
                    <div class="flex justify-between items-center">
                        <h2 class="text-2xl font-medium">{{ api_store.single_accomodation?.title }}</h2>
                        <figure class="w-16">
                            <img class="sm:h-16 rounded-full"
                                :src="api_store.single_accomodation?.host_thumb || '/other-icons/fallback_avatar.png'"
                                alt="">
                        </figure>
                    </div>
                    <div>
                        <span v-if="api_store.single_accomodation?.rooms === 1">{{ api_store.single_accomodation?.rooms
                            }} bedroom</span>
                        <span v-else>{{ api_store.single_accomodation?.rooms }} bedrooms</span>
                        -
                        <span v-if="api_store.single_accomodation?.beds === 1">{{ api_store.single_accomodation?.beds }}
                            bed</span>
                        <span v-else>{{ api_store.single_accomodation?.beds }} beds</span>
                        -
                        <span v-if="api_store.single_accomodation?.bathrooms === 1">{{
                            api_store.single_accomodation?.bathrooms }} bathroom</span>
                        <span v-else>{{ api_store.single_accomodation?.bathrooms }} bathrooms</span>
                    </div>
                    <div class="flex gap-2 items-center mt-5">
                        <i class="fa-solid fa-star"></i>
                        <span>{{ api_store.single_accomodation?.rating }}</span>
                    </div>

                    <hr class="my-8">

                    <!-- SERVICES -->
                    <h2 class="text-2xl font-medium">What this place offers</h2>

                    <div class="sm:columns-2 mt-4">
                        <div v-for="(service, index) in api_store.single_accomodation?.services" :key="index"
                            class="flex gap-4 mb-4">
                            <div>
                                <img class="w-6" :src="`/service-icons/${service.icons}`" alt="">
                            </div>
                            <p class="text-base">{{ service.name }}</p>
                        </div>
                    </div>


                    <!-- BOTTONI DA COMPLETARE CON IL TRIGGER PER IL FUNZIONAMENTO  -->
                    <!-- <button class="text-blue-500 mt-4">See more</button>
                        <button class="text-blue-500 mt-4">See less</button> -->

                    <!-- <hr class="my-8"> -->

                    <!-- <p id="description">descrizione</p> -->
                    <!-- BOTTONI DA COMPLETARE CON IL TRIGGER PER IL FUNZIONAMENTO  -->
                    <!-- <button class="text-blue-500 mt-4">See more</button>
                        <button class="text-blue-500 mt-4">See less</button> -->

                    <hr class="my-8">
                </section>

                <!-- CALENDAR SECTION -->
                <section class="">
                    <h2 class="text-2xl font-medium">How many nights you'll stay</h2>

                    <DatePicker class="mt-4" v-model.range.number="range" :columns="2" />


                    <hr class="my-8">
                </section>

                <!-- POSITION SECTION -->
                <section class="">
                    <h1 class="text-2xl font-medium">Where you'll be</h1>
                    <SingleMapVue></SingleMapVue>
                    <hr class="my-8">
                </section>

                <!-- CONTACT HOST SECTION -->
                <section class="contact-host">
                    <div class="flex items-center gap-10">
                        <figure class="w-16">
                            <img class="sm:h-16 rounded-full" :src="api_store.single_accomodation?.host_thumb" alt="">
                        </figure>
                        <div>
                            <h1 class="text-2xl font-medium">Hosted by {{ api_store.single_accomodation?.host_fullname
                                }}</h1>
                            <p>Joined {{ api_store.single_accomodation?.host_registration_date }}</p>
                        </div>
                    </div>
                    <button @click="() => { utility_store.showMessageHost = true }"
                        class="py-4 px-6 border-2 rounded-md border-black mt-5">Contact Host</button>

                </section>
            </div>

            <!-- PRICE SECTION -->

            <div class="bottom-right flex justify-end w-2/5">
                <section class="rounded-lg flex flex-col items-center gap-3 py-10 price-section sticky">
                    <p>€ {{ api_store.single_accomodation?.price_per_night }} / night</p>
                    <div class="flex">
                        <div class="py-1 pr-24 pl-2 border-2 border-r-0 rounded-l-lg">
                            <p class="text-xs">CHECK-IN</p>
                            <p class="text-xs">{{ formatDate(range.start) }}</p>
                        </div>
                        <div class="py-1 pr-24 pl-2 border-2 rounded-r-lg">
                            <p class="text-xs">CHECKOUT</p>
                            <p class="text-xs">{{ formatDate(range.end) }}</p>
                        </div>
                    </div>
                    <button @click="() => { utility_store.showMessageHost = true }"
                        class="py-2 px-28 rounded-lg gradient-button text-white mt-4">Message Host</button>
                    <p class="text-sm text-[#6B7280]">You won't be charged yet</p>
                    <div class="flex flex-col gap-2 w-9/12 mt-4">
                        <div class="flex justify-between">
                            <p>€ {{ api_store.single_accomodation?.price_per_night }} x {{ nights }} nights</p>


                        </div>
                        <!-- <div class="flex justify-between">
                            <p>Weekly discount</p>
                            <p>-$ price</p>
                        </div>
                        <div class="flex justify-between">
                            <p>Cleaning fee</p>
                            <p>$ price</p>
                        </div>
                        <div class="flex justify-between">
                            <p>Service fee</p>
                            <p>$ price</p>
                        </div>
                        <div class="flex justify-between">
                            <p>Occupancy taxes and fees</p>
                            <p>$ price</p>
                        </div> -->
                        <hr>
                        <div class="flex justify-between">
                            <p>Total</p>
                            <p>{{ api_store.single_accomodation?.price_per_night * nights }}€</p>
                        </div>
                    </div>
                </section>
            </div>

        </div>

    </main>

    <!-- <MessageHost :accomodation_id="route.params.id" /> -->
    <MessageHost v-show="utility_store.showMessageHost" :accomodation_id="route.params.id"
        class="message-host-overlay overlay-mask w-full h-full" />
    <MessageFeedback v-show="utility_store.showMessageFeedback"
        class="message-host-overlay overlay-mask w-full h-full" />



</template>

<style scoped>
.fa-star {
    font-size: 12px;
}

.main-img {
    object-fit: cover;
}

#side-img-container {
    width: calc(100% / 2);
}

.side-pictures {
    width: calc(100% / 2);
}

.all-thumbs {
    width: 100%;
    height: 400px;
    gap: 10px;
}

.left-thumbs {
    width: calc(100% / 2 - (10px / 2) + 10px);
}

.right-thumbs {
    width: calc(100% / 2 - (10px / 2) + 10px);
    gap: 10px;
}

.right-pictures {
    width: calc(100% / 2 - (10px / 2));
    height: calc(100% / 2 - (10px / 2));
}

.all-thumbs img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.contact-host button:hover {
    background-color: black;
    color: white;
}

.gradient-button {
    background: linear-gradient(135deg, #00CBD8, #B844FF);
}

.price-section {
    box-shadow: 0 5px 20px #1f293720;
    width: 380px;
    height: 350px;
    position: -webkit-sticky;
    position: sticky;
    top: 40px;
    display: none;
}


.message-host-overlay {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
}

.overlay-mask {
    background-color: rgba(30, 30, 30, 0.5);
}

@media (min-width: 950px) {
    .price-section {
        display: flex;
    }
}
</style>