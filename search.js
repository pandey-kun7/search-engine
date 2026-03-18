import fs from "fs"
import Clean from "./stemming.js";
import sortResults from "./sortResults.js";

export default function search(query) {
    try {
        const queryArr = query.split(" ");
        const searchQuery = [];
        for (const word of queryArr) {
            const cleanedWord = Clean(word);
            searchQuery.push(cleanedWord);
        }
        const ALLFILEDATA = JSON.parse(fs.readFileSync("./allFileData.json", "utf-8"));
        const RESULT = [];
        for (const file of Object.values(ALLFILEDATA)) {
            let totalWeightInCurrentFile = 0;
            for (const queryWord of searchQuery) {
                totalWeightInCurrentFile += Number(file[queryWord]["weight"]) || 0;
            }
            RESULT.push(
                [totalWeightInCurrentFile, file["filename"]]
            )
        }

        // console.log(RESULT)
        const real_result = RESULT.sort(sortResults)
        // console.log(real_result)
        console.log("The results for your query are : ")
        for (let i = real_result.length - 1; i >= 0; i--) {
            console.log(real_result[i][1]);
        }
        // console.log(RESULT.slice(0).sort(sortResults))
    } catch (err) {
        console.error("no word exists")
    }
}