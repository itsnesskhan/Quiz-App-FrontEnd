import { Quiz } from "./quiz";
import { User } from "./user";

export class Quiz_Result{
    constructor(
        public rid:number,
        public marksGot:number,
        public attempted:number,
        public correctAns:number,
        public user:User,
        public quiz:Quiz
    ){}
}