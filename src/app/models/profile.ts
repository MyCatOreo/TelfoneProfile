export interface Profile
{
    userId?: number,
    email: string,
    firstName: string,
    lastName: string,
    displayName: string,
    description: string,
    department: string,
    team: string
}

export const initProfile: Profile = {
    userId: undefined,
    email: "",
    firstName: "",
    lastName: "",
    displayName: "",
    description: "",
    department: "",
    team: ""
}