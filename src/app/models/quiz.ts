import { Category } from "./category";

export class Quiz{
    constructor(
        public qid:number,
        public title:string,
        public maxMarks:string,
        public numOfQuestion:string,
        public active:true,
        public category:Category
    ){}
}

// export interface Quiz{
//     title:string,
//     maxMarks:string,
//     numOfQuestion:string,
//     isActive:boolean,
//     category:Category
// }