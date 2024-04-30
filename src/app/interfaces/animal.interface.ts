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
    registeredAt: Date
}

export interface ISize {
    values: string[],
}

export interface IVaccines {
    values: string[],
}

export function createVaccines(): IVaccines {
    return {
        values: [],
    }
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
        registeredAt: new Date()
    }
}