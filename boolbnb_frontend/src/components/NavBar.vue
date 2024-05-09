<template>
    <main>
        <header
            class="flex justify-center flex-col pt-3 border-b-2 border-black items-center md:py-6 md:justify-between md:flex-row md:gap-0 md:px-10 lg:px-20 xl:px-36">
            <div class="block md:hidden xl:block">
                <RouterLink to="/" @click="reset()"><img class="w-36" src="/monsterbnb-logo.svg" alt="logo">
                </RouterLink>
            </div>
            <div class="hidden md:block xl:hidden">
                <RouterLink to="/"><img class="w-12" src="/Vector.ico" alt="logo"></RouterLink>
            </div>

            <div class="flex items-center gap-2 dropdown py-2 md:py-0">
                <div
                    class="search-group flex items-center justify-between border-2 rounded-full w-12/12 sm:w-[500px] px-3 pl-6 py-2">
                    <input class="w-4/5 border-0 focus:border-0 focus:border-transparent outline-0 focus:outline-0"
                        type="search" placeholder="Search accomodation..." v-model="search_string"
                        @input="getAddressReccomandations" @keydown.enter="searchAccomodations">
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

            <div>
                <div class="flex items-center gap-4">
                    <a href="http://127.0.0.1:8000/" class="hidden xl:block" target="_blank"><strong>Monsterbnb your
                            home</strong></a>
                    <!-- <div class="hidden md:block">
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
                    </div> -->
                </div>
            </div>
        </header>
    </main>
</template>



<script>

import axios from 'axios'
import { useApiStore } from '@/stores/apiStore'
import { useUtilityStore } from '@/stores/utilityStore';
import { useMapStore } from '@/stores/mapStore';
import { debounce } from 'lodash';


export default {
    name: 'NavBar',
    data() {
        return {
            api_store: useApiStore(),
            utility_store: useUtilityStore(),
            map_store: useMapStore(),
            search_string: '',
            address_suggestions: [],
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
            this.api_store.selected_position = suggestion.position

            this.address_suggestions = []
            this.searchAccomodations()
        },
        async searchAccomodations() {
            if (!this.api_store.selected_position.lon || !this.api_store.selected_position.lat) {
                return
            }

            try {
                this.api_store.page = 1
                this.api_store.api_filtered_results = [];
                this.api_store.user_query = this.search_string;
                this.search_string = ""
                let selected_position = [this.api_store.selected_position.lon, this.api_store.selected_position.lat]
                console.log(selected_position)
                await this.api_store.getFilteredAccomodations();
                await this.api_store.getMarkersData();
                this.$router.push({ name: 'search', params: { internalNavigation: true } });
                if (this.utility_store.show_map) {
                    this.map_store.flyTo(selected_position)
                }

                this.map_store.setMarkers(this.api_store.api_unpaginated_results);
                this.search_string = '';
            } catch (err) {
                // Handle errors that occur during the operation
                console.error('Error in searchAccomodations:', err);
            }
        },
        reset() {
            this.utility_store.show_map = false
            this.api_store.resetFilters()
        }

    }

}
</script>

<style scoped>
header {
    border-bottom: 2px solid #DDDDDD;
}

[type="search"]::-webkit-search-cancel-button {
    -webkit-appearance: none;
}



input:focus,
input {
    outline: none;
    color: black;
    border: 1px solid white;
    box-shadow: 0 1px 6px 0 rgb(255, 255, 255);
    border-radius: 0.5rem;
}

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
