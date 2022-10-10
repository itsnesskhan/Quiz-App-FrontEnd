import { Option } from "./option";
import { Quiz } from "./quiz";

export class Question{
    constructor(
        public question_id:number,
        public content:string,
        public options:Option[],
        public answer:string,
        public quiz:Quiz,
        public given_answer:string
    ){}
}