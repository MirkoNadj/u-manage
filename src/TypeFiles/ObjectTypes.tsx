export type PositionObject = {
    coords: { latitude: number, longitude: number }
}

export type Position = 'Manager' | 'Software Developer' | 'QA engineer' | 'Stuff';

export type PropsContextType = {
    currentCompany: string;
    setCurrentCompany: (c: string) => void
}