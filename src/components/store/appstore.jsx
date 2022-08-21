import { atom } from "recoil";

export const parkedCars = atom({
    key:'cars',
    default: []
});
export const availalbePark = atom({
    key:'space',
    default: new Array(21).fill(null).map((data,key) => {
        let sizeDetermine = ''
        if(key <= 6) {
            sizeDetermine = 'LP'
        }
        if(key > 6 && key <= 13) {
            sizeDetermine = 'MP'
        }
        if(key >= 14) {
            sizeDetermine = 'SP'
        }
        return {
            isAvalable:true,
            parkingNumber:key+1,
            isEntrance: (key+1 )% 7 === 0 ? key+1 : false,
            size:sizeDetermine,
        }
    })
})

export const history = atom*({
    key:'history',
    default:[]
});
