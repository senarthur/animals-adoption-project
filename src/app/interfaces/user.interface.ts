export interface IUser {
    name: string,
    age: number,
    email: string,
    phone: string,
    photoUrl: string,
    adoptedPets: string[],
    registeredPets: string[]
}

export function createUser(): IUser {
    return {
        name: '',
        age: 0,
        email: '',
        phone: '',
        photoUrl: '',
        adoptedPets: [],
        registeredPets: [],
    }
}