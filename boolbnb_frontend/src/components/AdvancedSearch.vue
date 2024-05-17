<script>

import { useUtilityStore } from '@/stores/utilityStore';
import { useApiStore } from '@/stores/apiStore';
import { useMapStore } from '@/stores/mapStore';


export default {
    name: 'AdvancedSearch',
    data() {
        return {
            Data: ['Any', '1', '2', '3', '4', '5', '6', '7', '8+'],
            Services: [
                { id: 1, label: "Television" },
                { id: 4, label: "Wifi" },
                { id: 5, label: "Air Conditioning" },
                { id: 8, label: "Kitchen" },
                { id: 9, label: "Free Parking On Premises" },
                { id: 12, label: "Pets Allowed" },
                { id: 15, label: "Gym" },
                { id: 25, label: "Hot Tub" },
                { id: 27, label: "Indoor Fireplace" },
                { id: 30, label: "Heating" },
                { id: 33, label: "Washer" },
                { id: 34, label: "Dryer" },
                { id: 35, label: "Smoke Alarm" },
                { id: 37, label: "First Aid Kit" },
                { id: 39, label: "Fire Extinguisher" },
                { id: 40, label: "Essentials 1: towels, bed sheets, soap, toilet paper" },
                { id: 41, label: "Shampoo" },
                { id: 44, label: "Hangers" },
                { id: 45, label: "Hair Dryer" },
                { id: 46, label: "Iron" },
                { id: 61, label: "Bathtub" },
                { id: 72, label: "Crib" },
                { id: 87, label: "Ethernet Connection" },
                { id: 89, label: "Microwave" },
                { id: 90, label: "Coffee Maker" },
                { id: 91, label: "Refrigerator" },
                { id: 92, label: "Dishwasher" },
                { id: 95, label: "Oven" },
                { id: 99, label: "BBQ Grill" },
                { id: 100, label: "Patio / Balcony" },
                { id: 258, label: "Private Pool" },
                { id: 415, label: "Monster Cans" },
                { id: 515, label: "Ping Pong Table" },
                { id: 521, label: "Pool Table" },
                { id: 626, label: "BBQ Utensils" }
            ],

            displayedServices: [],
            utility_store: useUtilityStore(),
            api_store: useApiStore(),
            map_store: useMapStore()
        }
    },
    mounted() {
        this.displayedServices = this.Services.slice(0, 6);
    },
    methods: {
        showMore() {
            const currentIndex = this.displayedServices.length;
            const newServices = this.Services.slice(currentIndex, currentIndex + 40);
            this.displayedServices = this.displayedServices.concat(newServices);
        },
        showLess() {
            this.displayedServices.length = 6;
        },
        updateDistanceFilter(event) {
            this.api_store.filters.max_distance = event.target.value;
        },
        updateMaxPrice(event) {
            let user_input = Number(event.target.value);
            this.api_store.filters.max_price = user_input
        },
        updateMinPrice(event) {
            this.api_store.filters.min_price = Number(event.target.value);
        },
        updateType(type) {
            this.api_store.filters.type = type;
        },
        updateServiceFilter(service) {
            const index = this.api_store.filters.services.indexOf(service.id);

            if (index === -1) {
                this.api_store.filters.services.push(service.id);
            } else {
                this.api_store.filters.services.splice(index, 1);
            }


        },
        updateNumber(value, field) {
            switch (field) {
                case 'rooms':
                    this.api_store.filters.rooms = value
                    break;
                case 'beds':
                    this.api_store.filters.beds = value
                    break;

                case 'bathrooms':
                    this.api_store.filters.bathrooms = value
                    break;
                default:
                    return
            }

        },
        closeFilters() {
            this.utility_store.show_filters = false
        },
        resetFilters() {
            this.api_store.resetFilters()
        },
        async applyFilters() {
            let selected_position = [this.api_store.selected_position.lon, this.api_store.selected_position.lat]
            //TODO - fix possible fucked up filters

            this.api_store.api_filtered_results = []
            this.utility_store.show_filters = false
            this.$router.push({ name: 'search', params: { internalNavigation: true } })
            await this.api_store.getFilteredAccomodations()
            await this.api_store.getMarkersData();
            this.map_store.flyTo(selected_position)
            this.map_store.setMarkers(this.api_store.api_unpaginated_results);
        }
    },
    computed: {

    }
}

</script>

<template>
    <div class="xl:w-6/12 container" style="margin: 0 auto;">
        <div class="relative">

            <!-- Poup header -->
            <div>
                <h3 class="py-8 text-center font-medium text-lg">Filters</h3>
                <img src="../../other-icons/close-icon.svg" class="top-3 left-3 text-4xl cursor-pointer w-10 absolute"
                    @click="closeFilters" alt="">
                <hr>
            </div>


            <!-- Popup body -->
            <div class="popup-body px-20 py-10">

                <!-- Distance -->
                <p class="text-xl font-semibold">Distance from your search</p>
                <p>Extend your search</p>
                <div class="slidecontainer flex gap-10 mt-6">
                    <p class="w-32 border border-[#B0B0B0] p-2 rounded-lg">{{ api_store.filters.max_distance }} km</p>
                    <div class="range">
                        <input class="" type="range" min="1" max="400" :value="api_store.filters.max_distance"
                            @input="updateDistanceFilter">
                    </div>
                </div>

                <hr class="my-14">

                <!-- Price -->
                <p class="text-xl font-semibold">Price range</p>
                <p>Nightly prices including fees and taxes</p>
                <div class="flex items-center justify-center gap-8 pt-6">
                    <input type="number" class="border border-[#B0B0B0] py-4 xl:pr-56 w-11/12 pl-2 rounded-lg"
                        placeholder="Minimum" :value="api_store.filters.min_price" @input="updateMinPrice">
                    <input type="number" class="border border-[#B0B0B0] py-4 xl:pr-56 w-11/12 pl-2 rounded-lg"
                        placeholder="Maximum" :value="api_store.filters.max_price" @input="updateMaxPrice">
                </div>

                <hr class="my-14">

                <!-- Rooms, Beds, Bathrooms -->
                <p class="text-xl font-semibold">Rooms and beds</p>
                <div>
                    <p class="pt-4">Bedrooms</p>
                    <div class="flex flex-wrap lg:flex-nowrap">
                        <div class="p-2" v-for="(element, index) in Data" :key="index"
                            @click="updateNumber(element, 'rooms')">
                            <p class="check-button px-8 py-2 border rounded-full"
                                :class="element == api_store.filters.rooms ? 'active' : ''">{{ element }}</p>
                        </div>
                    </div>
                    <p class="pt-4">Beds</p>
                    <div class="flex flex-wrap lg:flex-nowrap">
                        <div class="p-2" v-for="(element, index) in Data" :key="index"
                            @click="updateNumber(element, 'beds')">
                            <p class="check-button px-8 py-2 border rounded-full"
                                :class="element == api_store.filters.beds ? 'active' : ''">{{ element }}</p>
                        </div>
                    </div>
                    <p class="pt-4">Bathrooms</p>
                    <div class="flex flex-wrap lg:flex-nowrap">
                        <div class="p-2" v-for="(element, index) in Data" :key="index"
                            @click="updateNumber(element, 'bathrooms')">
                            <p class="check-button px-8 py-2 border rounded-full"
                                :class="element == api_store.filters.bathrooms ? 'active' : ''">{{ element }}</p>
                        </div>
                    </div>
                </div>

                <hr class="my-14">

                <!-- Property type -->
                <p class="text-xl font-semibold">Property type</p>

                <div class="flex flex-wrap md:flex-nowrap justify-center md:justify-between mt-6">
                    <div class="cursor-pointer border-2 w-48 min-h-32 rounded-xl flex flex-col justify-between align-baseline"
                        :class="api_store.filters.type == 'House' ? 'border-black' : ''" @click="updateType('House')">
                        <img class="w-8 mt-3 ml-3" src="/other-icons/Home.svg" alt="house">
                        <p class="mb-3 ml-3 text-xl">House</p>
                    </div>
                    <div class="cursor-pointer border-2 w-48 min-h-32 rounded-xl flex flex-col justify-between align-baseline"
                        @click="updateType('Apartment')"
                        :class="api_store.filters.type == 'Apartment' ? 'border-black' : ''">
                        <img class="w-8 mt-3 ml-3" src="/other-icons/Apartment.svg" alt="">
                        <p class="mb-3 ml-3 text-xl">Apartment</p>
                    </div>
                    <div class="cursor-pointer border-2 w-48 min-h-32 rounded-xl flex flex-col justify-between align-baseline"
                        @click="updateType('GuestHouse')"
                        :class="api_store.filters.type == 'GuestHouse' ? 'border-black' : ''">
                        <img class="w-8 mt-3 ml-3" src="/other-icons/Guesthouse.svg" alt="guesthouse">
                        <p class="mb-3 ml-3 text-xl">Guesthouse</p>
                    </div>
                    <div class="cursor-pointer border-2 w-48 min-h-32 rounded-xl flex flex-col justify-between align-baseline"
                        @click="updateType('Hotel')" :class="api_store.filters.type == 'Hotel' ? 'border-black' : ''">
                        <img class="w-8 mt-3 ml-3" src="/other-icons/hotelbnb.svg" alt="hotelbnb">
                        <p class="mb-3 ml-3 text-xl">Hotel / B&B</p>
                    </div>

                </div>

                <hr class="my-14">

                <!-- Services -->
                <p class="text-xl font-semibold">Services</p>
                <div class="pt-4">
                    <div class="flex flex-wrap gap-4 align-text-bottom">

                        <div class="services-input" v-for="(element, index) in displayedServices" :key="element.id">
                            <input type="checkbox" :id="'myCheckbox_' + index" class="custom-checkbox"
                                @input="updateServiceFilter(element)"
                                :checked="api_store.filters.services.includes(element.id)">
                            <label :for="'myCheckbox_' + index" class="checkbox-label">{{ element.label }}</label>
                        </div>

                    </div>

                    <button v-if="displayedServices.length < Services.length" @click="showMore"
                        class="font-medium mt-6 underline">Show more</button>
                    <button v-if="displayedServices.length >= Services.length" @click="showLess"
                        class="font-medium mt-6 underline">Show less</button>
                </div>

            </div>


            <!-- Popup footer -->
            <div>
                <hr>
                <div class="px-20 py-6 flex justify-between" style="align-items: center;">
                    <div class="font-medium cursor-pointer" @click="resetFilters">Clear All</div>
                    <button class="bg-black text-white p-2 rounded-lg cursor-pointer" @click="applyFilters">Show
                        Results</button>
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    appearance: none;
    margin: 0;
}

input[type="range"] {
    /* removing default appearance */
    -webkit-appearance: none;
    appearance: none;
    /* creating a custom design */
    width: 100%;
    cursor: pointer;
    outline: none;
    /*  slider progress trick  */
    overflow: hidden;
    border-radius: 16px;
}

/* Track: webkit browsers */
input[type="range"]::-webkit-slider-runnable-track {
    height: 10px;
    background: #ccc;
    border-radius: 16px;
}

/* Track: Mozilla Firefox */
input[type="range"]::-moz-range-track {
    height: 10px;
    background: #ccc;
    border-radius: 16px;
}

/* Thumb: webkit */
input[type="range"]::-webkit-slider-thumb {
    /* removing default appearance */
    -webkit-appearance: none;
    appearance: none;
    /* creating a custom design */
    height: 10px;
    width: 10px;
    background-color: black;
    border-radius: 50%;
    /*  slider progress trick  */
    box-shadow: -50rem 0 5rem 20rem hsl(184, 100%, 42%),
        -40rem 0 5rem 30rem hsl(202, 76%, 55%),
        -30rem 0 2rem 25rem hsl(251, 86%, 69%),
        -25.5rem 0 0 25rem hsl(277, 100%, 63%);
}



/*=============
Aesthetics 
=========================*/


.range {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0px 10px;
}


.check-button:hover {
    color: white;
    background-color: black;
    cursor: pointer;
}


/* Nascondi la checkbox predefinita */
.custom-checkbox {
    position: absolute;
    opacity: 0;
}

/* Stile del wrapper della checkbox */
.checkbox-label {
    position: relative;
    padding-left: 35px;
    padding-top: 5px;
    /* Aggiungi spazio per il segno di spunta personalizzato */
    cursor: pointer;
}

/* Stile della checkbox personalizzata */
.checkbox-label::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 30px;
    height: 30px;
    border: 1px solid #ccc;
    border-radius: 6px;
    background-color: white;
}

/* Stile del segno di spunta quando la checkbox è selezionata */
.checkbox-label::after {
    content: '\2713';
    /* Codice Unicode per il segno di spunta */
    font-size: 20px;
    position: absolute;
    top: 0px;
    left: 7px;
    color: white;
    /* Colore del segno di spunta */
    visibility: visible;
}

/* Stile del segno di spunta quando la checkbox è selezionata */
.custom-checkbox:checked+.checkbox-label::before {
    background-color: black;
    /* Cambia il colore di sfondo della checkbox selezionata */
}

/* Visualizza il segno di spunta quando la checkbox è selezionata */
.custom-checkbox:checked+.checkbox-label::after {
    visibility: visible;
}

div.container {

    position: fixed;
    z-index: 12;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    max-height: 90vh;
    border-radius: 20px;
}

.popup-body {
    overflow-y: scroll;
    height: calc(90vh - 200px);
}

.active {
    color: white;
    background-color: black;
}

.services-input {
    width: calc(100% / 1 - 20px);
}

@media (min-width: 550px) {
    .services-input {
        width: calc(100% / 2 - 20px);
    }
}
</style>