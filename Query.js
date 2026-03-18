import fs from "fs"
import readline from "readline"
import search from "./search.js";
export default function query(){
    const r1 = readline.createInterface(
        {
            input:process.stdin,
            output:process.stdout,
        }
    )
    r1.question("Enter your query : ",q=>{
        search(q)
        r1.close();
    })
}

query();