export interface IAnimal {
    id: string,
    registerId: string;
    userId: string | null,
    name: string,
    image: string,
    breed: string,
    age: number,
    size: string,
    vaccines: string[],
    gender: string,
}

export interface ISize {
    values: string[],
}

export interface IVaccines {
    values: string[],
}

export function createAnimal() {
    return {
        id: '',
        registerId: '',
        userId: '',
        name: '',
        image: '',
        breed: '',
        age: 0,
        size: '',
        vaccines: [],
        gender: '',
    }
}