<template>
    <main>
        <header class="flex justify-between pr-32 pl-32 py-5 border-b-2 border-black items-center">
            <a href="#"><img class="w-28" src="../../public/airbnb.svg" alt="logo"></a>
            <div class="flex items-center gap-2  dropdown">
                <div
                    class="search-group flex items-center justify-between border-2 rounded-full w-[500px] px-3 pl-6 py-2 ">
                    <input class="w-4/5" type="search" placeholder="Search accomodation..." v-model="search_string"
                        @input="getAddressReccomandations">
                    <i class="fa-solid fa-magnifying-glass" style="color: #bdc6d6;" @click="searchAccomodations"></i>
                </div>

                <!-- <a href="#" class="p-2 border-2 rounded-full"></a> -->
                <div class="dropdown-content" style="display: block;"
                    v-show="search_string && address_suggestions.length > 0">
                    <span v-for="(suggestion, index) in address_suggestions" :key="index"
                        @click="setReaserch(suggestion)">
                        {{ suggestion?.address }}
                    </span>
                </div>
            </div>
            <div class="flex items-center gap-4">
                <p><strong>Airbnb your home</strong></p>
                <div class="dropdown">
                    <button class="flex items-center gap-4 border-2 p-2 rounded-full">
                        <svg class="w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path
                                d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
                        </svg>
                        <div class="bg-gray-500	p-1.5 rounded-full">
                            <svg class="w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">

                                <path fill="#ffffff"
                                    d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                            </svg>
                        </div>
                    </button>
                    <div class="dropdown-content">
                        <a href="#">Sign Up</a>
                        <a href="#">Log In</a>
                    </div>
                </div>
            </div>
        </header>
    </main>
</template>


<script>

import axios from 'axios'
import { useApiStore } from '@/stores/apiStore'
import { debounce } from 'lodash';


export default {
    name: 'NavBar',
    data() {
        return {
            api_store: useApiStore(),
            search_string: '',
            address_suggestions: [],
            selected_position: undefined,
            page: 1,
            filters: {
                max_distance: 20
            }
        }
    },
    methods: {
        async getAddressReccomandations() {
            const debouncedGetAddressReccomandations = debounce(async (search_string) => {
                try {
                    let result_reccomandations = await this.api_store.getAddressReccomandations(search_string);
                    if (result_reccomandations) {
                        this.address_suggestions = result_reccomandations
                    }


                } catch (error) {
                    console.error('Error getting address recommendations:', error);
                }
            }, 300);
            debouncedGetAddressReccomandations(this.search_string);
        },
        setReaserch(suggestion) {
            this.selected_position = suggestion.position
            this.search_string = suggestion.address
            this.address_suggestions = []
        },
        async searchAccomodations() {
            console.log(this.page, this.selected_position, this.filters)
            console.log(await this.api_store.getFilteredAccomodations(this.page, this.selected_position, this.filters))
            this.api_store.user_query = this.search_string
            this.api_store.distance_filter = this.filters.max_distance
            this.search_string = ''
        }

    }

}
</script>

<style scoped>
.dropdown {
    position: relative;
    display: inline-block;
}

.dropdown-content {
    display: none;
    position: absolute;
    background-color: #f1f1f1;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
}

.dropdown-content a,
.dropdown-content span {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
}

.dropdown-content a:hover,
.dropdown-content span:hover {
    background-color: #ddd;
}

.dropdown:hover .dropdown-content {
    display: block;
}
</style>