import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
    name: 'roomFormat'
})
export class RoomFormatPipe implements PipeTransform {

    transform(roomCode: string) {
        if (Object.keys(translation).includes(roomCode)) {
            return translation[roomCode]
        }
    }

}

const translation = {
    201: 'Přednáškovna 1 (201)',
    204: 'Přednáškovna 2 (204)',
    206: 'Přednáškovna 3 (206)',
    207: 'Přednáškovna 4 (207)',
    208: 'Přednáškovna 5 (208)',
    FOOD: 'Jídelna',
    FRONT: 'Vestibul',
    SPORT: 'Šatny u horní tělocvičny',
    ART: 'Ateliér'
}