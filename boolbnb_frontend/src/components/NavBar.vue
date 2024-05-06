<template>
    <main>
        <header class="flex md:justify-between justify-center py-5 border-b-2 border-black items-center md:px-10 lg:px-20 xl:px-36">
                <div  class="hidden xl:block">
                    <RouterLink to="/"><img class="w-36" src="/monsterbnb-logo.svg" alt="logo"></RouterLink>
                </div>
                <div  class="hidden md:block xl:hidden">
                    <RouterLink to="/"><img class="w-12" src="/Vector.ico" alt="logo"></RouterLink>
                </div>

                <div class="flex items-cente gap-2">
                    <div class="flex items-center gap-2  dropdown">
                        <div
                            class="search-group flex items-center justify-between border-2 rounded-full w-[500px] px-3 pl-6 py-2">
                            <input class="w-4/5" type="search" placeholder="Search accomodation..." v-model="search_string"
                                @input="getAddressReccomandations">
                            <i class="fa-solid fa-magnifying-glass" style="color: #bdc6d6;"
                                @click="searchAccomodations"></i>
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
                </div>

            <div>
                <div class="flex items-center gap-4">
                    <p class="hidden xl:block"><strong>Monsterbnb your home</strong></p>
                    <div class="hidden md:block">
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
            this.search_string = suggestion.address
            this.address_suggestions = []
        },
        async searchAccomodations() {
            try {
                this.api_store.api_filtered_results = [];
                this.api_store.user_query = this.search_string;
                let selected_position = [this.api_store.selected_position.lon, this.api_store.selected_position.lat]
                await this.api_store.getFilteredAccomodations();
                await this.api_store.getMarkersData();
                this.$router.push({ name: 'search', params: { internalNavigation: true } });
                this.map_store.flyTo(selected_position)
                this.map_store.setMarkers(this.api_store.api_unpaginated_results);
                this.search_string = '';
            } catch (err) {
                // Handle errors that occur during the operation
                console.error('Error in searchAccomodations:', err);
            }
        }

    }

}
</script>

<style scoped>
header {
    border-bottom: 2px solid #DDDDDD;
}

input {
    outline: none;
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
