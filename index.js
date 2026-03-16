import fs from "fs"
import Clean from "./stemming.js";
import makeItf from "./tfScorer.js";

const Word_Set = new Set();

const AllFilesWords = [];

const files = fs.readdirSync("./DOCS");

const FILES_INCLUDED = JSON.parse(fs.readFileSync("./filesIncluded.json", "utf-8"));

for (const filename of files) {
    if (FILES_INCLUDED.includes(filename)) {
        continue;
    } else {
        const allWordsOfFile = []
        const readDocBuf = fs.readFileSync(`./DOCS/${filename}`);
        const DocContent = String(readDocBuf);
        const AllWords = DocContent.split(" ")
        // console.log(AllWords)
        for (const word of AllWords) {
            const WORD = Clean(word);
            allWordsOfFile.push(WORD);
            // Word_Set.add(WORD)
        }
        AllFilesWords.push(allWordsOfFile)
        FILES_INCLUDED.push(filename);
    }
}

for (const filewordset of AllFilesWords) {
    for (const word of filewordset) {
        Word_Set.add(word);
    }
}

fs.writeFileSync("./filesIncluded.json", JSON.stringify(FILES_INCLUDED, null, 2))

const content = [...Word_Set].join('\n')


// async method hence had to make sync
// const stream = fs.createWriteStream("./Words.txt", {
//     flags: "a+"
// });
// for (const word of content) {
//     stream.write(word);
// }
// stream.close();

fs.writeFileSync("./Words.txt",content,{
    flag:"a+",
})

for(const file of files){
    makeItf(file);
}