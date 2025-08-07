document.addEventListener('DOMContentLoaded', () => {
    const departureSelect = document.getElementById('departure');
    const destinationSelect = document.getElementById('destination');

    // This function will be implemented once the backend is ready
    async function fetchWilayas() {
        // For now, we'll use dummy data.
        const wilayas = [
            'Adrar', 'Chlef', 'Laghouat', 'Oum El Bouaghi', 'Batna', 'Béjaïa', 'Biskra', 'Béchar', 'Blida', 'Bouira', 'Tamanrasset', 'Tébessa', 'Tlemcen', 'Tiaret', 'Tizi Ouzou', 'Algiers', 'Djelfa', 'Jijel', 'Sétif', 'Saïda', 'Skikda', 'Sidi Bel Abbès', 'Annaba', 'Guelma', 'Constantine', 'Médéa', 'Mostaganem', 'M\'Sila', 'Mascara', 'Ouargla', 'Oran', 'El Bayadh', 'Illizi', 'Bordj Bou Arréridj', 'Boumerdès', 'El Tarf', 'Tindouf', 'Tissemsilt', 'El Oued', 'Khenchela', 'Souk Ahras', 'Tipaza', 'Mila', 'Aïn Defla', 'Naâma', 'Aïn Témouchent', 'Ghardaïa', 'Relizane'
        ];

        populateDropdown(departureSelect, wilayas);
        populateDropdown(destinationSelect, wilayas);
    }

    function populateDropdown(selectElement, items) {
        items.forEach(item => {
            const option = document.createElement('option');
            option.value = item.toLowerCase().replace(/ /g, '-');
            option.textContent = item;
            selectElement.appendChild(option);
        });
    }

    fetchWilayas();
});
