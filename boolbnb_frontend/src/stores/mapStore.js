import { defineStore } from 'pinia'
import { useApiStore } from './apiStore';
import { toRaw } from 'vue';
import tt from '@tomtom-international/web-sdk-maps';




export const useMapStore = defineStore('map_store', {
    state: () => ({
        map_istance: undefined,
        api_store: useApiStore()
    }),
    getters: {

    },
    actions: {
        async createMap() {
            return new Promise((resolve) => {
                this.map_istance = tt.map({
                    key: this.api_store.tom_api_key,
                    container: 'map',
                    zoom: 7,
                    center: [12.769474, 41.906025]
                });


                const ttGeoControls = new tt.GeolocateControl({
                    positionOptions: {
                        enableHighAccuracy: true
                    },
                    trackUserLocation: true
                })
                const ttNavControls = new tt.NavigationControl();
                // ttGeoControls.on('trackuserlocationstart', (e) => {
                //     this.map_istance.setZoom(11)
                // });

                this.map_istance.addControl(ttGeoControls, 'top-right')
                this.map_istance.addControl(ttNavControls, 'top-right')
                this.map_istance.on('load', () => {
                    resolve()
                });

            })

        },
        setMarkers(accommodations) {
            console.log(accommodations)
            const popupOffsets = {
                top: [0, 0],
                bottom: [0, -50],
                "bottom-right": [0, -50],
                "bottom-left": [0, -70],
                left: [25, -35],
                right: [-25, -35],
            }


            let mapInstance = toRaw(this.map_istance);
            accommodations.forEach((el) => {
                const popupContent = `
                <a href="/Single_Accomodation/${el.id}" class="popup-card cursor-pointer rounded-lg">
                    <img src="${el.thumb}" alt="Accommodation Thumbnail" class="popup_thumbnail w-full">
                    <div class="flex justify-between font-bold">
                        <div>${el.address}</div>
                        <div class="flex items-center gap-2">
                            <i class="fa-solid fa-star"></i>
                            <span>${el.rating}</span>
                        </div>
                    </div>
                    <div class="popup_title">${el.title}</div>
                    <div class="popup_price"><strong>${el.price_per_night}€</strong> per Night</div>
                </a>
            `;


                let new_marker = new tt.Marker()
                    .setLngLat([el.longitude, el.latitude])
                    .addTo(mapInstance);

                let new_popup = new tt.Popup({ offset: popupOffsets, anchor: 'bottom', closeButton: false }).setHTML(
                    popupContent
                );

                new_marker.setPopup(new_popup)

                // Add custom marker class
                const marker_html = new_marker.getElement()
                marker_html.firstChild.remove()
                let markerLabel = document.createElement('span');
                markerLabel.textContent = el.price_per_night + '€';
                markerLabel.classList.add('tt-marker-label'); // Add custom marker label class
                marker_html.appendChild(markerLabel);
            });
        },
        flyTo(position) {
            const options = {
                curve: 1.42,
                minZoom: 1,
                speed: 1.2,
                screenSpeed: 1,
                maxDuration: 1
            };

            console.log(this.map_istance)
            this.map_istance.flyTo({
                center: position,
                zoom: 13
            }, options);

        }

    },
})