export const translateMountPlace = (mountPlace) => {
    switch (mountPlace) {
        case 'Toilet':
            return 'Туалет'
        case 'Vestibule':
            return 'Тамбур'
        case 'Apartment':
            return 'Квартира'
        case 'Corridor':
            return 'Коридор'
        case 'Kitchen':
            return 'Кухня'
    }
}
