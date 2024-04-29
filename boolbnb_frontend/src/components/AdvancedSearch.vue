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

            console.log(this.api_store.filters.services)
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
            this.api_store.filters.max_distance = 20
            this.api_store.filters.min_price = undefined
            this.api_store.filters.max_price = undefined
            this.api_store.filters.rooms = 'Any'
            this.api_store.filters.beds = 'Any'
            this.api_store.filters.bathrooms = 'Any'
            this.api_store.filters.type = undefined
        },
        async applyFilters() {
            let selected_position = [this.api_store.selected_position.lon, this.api_store.selected_position.lat]
            //TODO - fix possible fucked up filters
            console.log(this.api_store.filters)
            this.api_store.api_filtered_results = []
            this.utility_store.show_filters = false
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
    <div class="py-24 w-6/12 container" style="margin: 0 auto;">
        <div class="border-2 relative">
            <p class="py-8 text-center"><strong>Filters</strong></p>
            <i class="fa-solid fa-circle-xmark absolute top-1 left-2 text-4xl cursor-pointer" @click="closeFilters"></i>
            <hr>
            <div class="px-10 py-10">
                <p class="text-2xl"><strong>Distance from your search</strong></p>
                <p>Extend your search</p>
                <div class="slidecontainer flex gap-10 mt-6">
                    <p class="w-1/12 border-2">{{ api_store.filters.max_distance }} km</p>
                    <input class="w-10/12" type="range" min="1" max="400" :value="api_store.filters.max_distance"
                        @input="updateDistanceFilter">
                </div>
                <hr class="my-8">
                <p class="text-2xl"><strong>Price range</strong></p>
                <p>Nightly prices including fees and taxes</p>
                <div class="flex items-center justify-center gap-8 pt-6">
                    <input type="number" class="border-2 border-black py-4 pr-56 pl-2 rounded" placeholder="Minimum"
                        :value="api_store.filters.min_price" @input="updateMinPrice">
                    <input type="number" class="border-2 border-black py-4 pr-56 pl-2 rounded" placeholder="Maximum"
                        :value="api_store.filters.max_price" @input="updateMaxPrice">
                </div>
                <hr class="my-8">
                <p class="text-2xl"><strong>Rooms and beds</strong></p>
                <div>
                    <p class="pt-4">Bedrooms</p>
                    <div class="flex">
                        <div class="p-2" v-for="(element, index) in Data" :key="index"
                            @click="updateNumber(element, 'rooms')">
                            <p class="check-button px-8 py-2 border-2 rounded-full"
                                :class="element == api_store.filters.rooms ? 'active' : ''">{{ element }}</p>
                        </div>
                    </div>
                    <p class="pt-4">Beds</p>
                    <div class="flex">
                        <div class="p-2" v-for="(element, index) in Data" :key="index"
                            @click="updateNumber(element, 'beds')">
                            <p class="check-button px-8 py-2 border-2 rounded-full"
                                :class="element == api_store.filters.beds ? 'active' : ''">{{ element }}</p>
                        </div>
                    </div>
                    <p class="pt-4">Bathrooms</p>
                    <div class="flex">
                        <div class="p-2" v-for="(element, index) in Data" :key="index"
                            @click="updateNumber(element, 'bathrooms')">
                            <p class="check-button px-8 py-2 border-2 rounded-full"
                                :class="element == api_store.filters.bathrooms ? 'active' : ''">{{ element }}</p>
                        </div>
                    </div>
                </div>
                <hr class="my-8">
                <p class="text-2xl"><strong>Property type</strong></p>
                <div class="flex justify-between mt-6">
                    <div class="cursor-pointer border-2 w-48 min-h-32 rounded-xl flex flex-col justify-between align-baseline"
                        :class="api_store.filters.type == 'House' ? 'border-black' : ''" @click="updateType('House')">
                        <svg class="w-8 mt-3 ml-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                            <path fill="#000000"
                                d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
                        </svg>
                        <p class="mb-3 ml-3 text-xl">House</p>
                    </div>
                    <div class="cursor-pointer border-2 w-48 min-h-32 rounded-xl flex flex-col justify-between align-baseline"
                        @click="updateType('Apartment')"
                        :class="api_store.filters.type == 'Apartment' ? 'border-black' : ''">
                        <svg class="w-8 mt-3 ml-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">

                            <path fill="#000000"
                                d="M64 48c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16h80V400c0-26.5 21.5-48 48-48s48 21.5 48 48v64h80c8.8 0 16-7.2 16-16V64c0-8.8-7.2-16-16-16H64zM0 64C0 28.7 28.7 0 64 0H320c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zm88 40c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16v48c0 8.8-7.2 16-16 16H104c-8.8 0-16-7.2-16-16V104zM232 88h48c8.8 0 16 7.2 16 16v48c0 8.8-7.2 16-16 16H232c-8.8 0-16-7.2-16-16V104c0-8.8 7.2-16 16-16zM88 232c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16v48c0 8.8-7.2 16-16 16H104c-8.8 0-16-7.2-16-16V232zm144-16h48c8.8 0 16 7.2 16 16v48c0 8.8-7.2 16-16 16H232c-8.8 0-16-7.2-16-16V232c0-8.8 7.2-16 16-16z" />
                        </svg>
                        <p class="mb-3 ml-3 text-xl">Apartment</p>
                    </div>
                    <div class="cursor-pointer border-2 w-48 min-h-32 rounded-xl flex flex-col justify-between align-baseline"
                        @click="updateType('GuestHouse')"
                        :class="api_store.filters.type == 'GuestHouse' ? 'border-black' : ''">
                        <svg class="w-8 mt-3 ml-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">

                            <path fill="#000000"
                                d="M543.8 287.6c17 0 32-14 32-32.1c1-9-3-17-11-24L512 185V64c0-17.7-14.3-32-32-32H448c-17.7 0-32 14.3-32 32v36.7L309.5 7c-6-5-14-7-21-7s-15 1-22 8L10 231.5c-7 7-10 15-10 24c0 18 14 32.1 32 32.1h32v69.7c-.1 .9-.1 1.8-.1 2.8V472c0 22.1 17.9 40 40 40h16c1.2 0 2.4-.1 3.6-.2c1.5 .1 3 .2 4.5 .2H160h24c22.1 0 40-17.9 40-40V448 384c0-17.7 14.3-32 32-32h64c17.7 0 32 14.3 32 32v64 24c0 22.1 17.9 40 40 40h24 32.5c1.4 0 2.8 0 4.2-.1c1.1 .1 2.2 .1 3.3 .1h16c22.1 0 40-17.9 40-40V455.8c.3-2.6 .5-5.3 .5-8.1l-.7-160.2h32z" />
                        </svg>
                        <p class="mb-3 ml-3 text-xl">Guesthouse</p>
                    </div>
                    <div class="cursor-pointer border-2 w-48 min-h-32 rounded-xl flex flex-col justify-between align-baseline"
                        @click="updateType('Hotel')" :class="api_store.filters.type == 'Hotel' ? 'border-black' : ''">
                        <svg class="w-8 mt-3 ml-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">

                            <path fill="#000000"
                                d="M0 32C0 14.3 14.3 0 32 0H480c17.7 0 32 14.3 32 32s-14.3 32-32 32V448c17.7 0 32 14.3 32 32s-14.3 32-32 32H304V464c0-26.5-21.5-48-48-48s-48 21.5-48 48v48H32c-17.7 0-32-14.3-32-32s14.3-32 32-32V64C14.3 64 0 49.7 0 32zm96 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V112c0-8.8-7.2-16-16-16H112c-8.8 0-16 7.2-16 16zM240 96c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V112c0-8.8-7.2-16-16-16H240zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V112c0-8.8-7.2-16-16-16H368c-8.8 0-16 7.2-16 16zM112 192c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V208c0-8.8-7.2-16-16-16H112zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V208c0-8.8-7.2-16-16-16H240c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V208c0-8.8-7.2-16-16-16H368zM328 384c13.3 0 24.3-10.9 21-23.8c-10.6-41.5-48.2-72.2-93-72.2s-82.5 30.7-93 72.2c-3.3 12.8 7.8 23.8 21 23.8H328z" />
                        </svg>
                        <p class="mb-3 ml-3 text-xl">Hotel / B&B</p>
                    </div>
                </div>
                <hr class="my-8">
                <p class="text-2xl"><strong>Services</strong></p>
                <div class="pt-4">
                    <div class="flex flex-wrap gap-4 align-text-bottom">
                        <div v-for="(element, index) in displayedServices" :key="element.id"
                            style="width: calc(100% / 2 - 20px);">
                            <input type="checkbox" :id="'myCheckbox_' + index" class="custom-checkbox"
                                @input="updateServiceFilter(element)">
                            <label :for="'myCheckbox_' + index" class="checkbox-label">{{ element.label }}</label>
                        </div>
                    </div>

                    <button v-if="displayedServices.length < Services.length" @click="showMore"
                        class="text-blue-500 mt-4">See more</button>
                    <button v-if="displayedServices.length >= Services.length" @click="showLess"
                        class="text-blue-500 mt-4">See less</button>
                </div>
            </div>
            <hr>
            <div class="px-10 py-4 flex justify-between" style="align-items: center;">
                <div class="font-bold cursor-pointer" @click="resetFilters">Clear All</div>
                <button class="bg-black text-white p-2 rounded-lg cursor-pointer" @click="applyFilters">Show
                    Results</button>
            </div>
        </div>
    </div>

</template>

<style>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    appearance: none;
    margin: 0;
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
    border: 2px solid #ccc;
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
    overflow: scroll;
    border-radius: 20px;

}

.active {
    color: white;
    background-color: black;
}
</style>