export interface User{
        id:number,
        name:Name,
        email:string,
        password:string
        profile:string,
        roles:UserRole[]
        profileUrl?:string,
}

export interface Name{
    fname:string,
    lname:string
}
export interface UserRole{
    id:number,
    name:string
}