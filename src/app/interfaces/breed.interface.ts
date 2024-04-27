export interface IBreed {
    weight: Weight
    height: Height
    id: number
    name: string
    bred_for: string
    breed_group: string
    life_span: string
    temperament: string
    origin: string
    reference_image_id: string
}

interface Weight {
    imperial: string
    metric: string
}

interface Height {
    imperial: string
    metric: string
}