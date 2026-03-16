import fs from "fs"
import Clean from "./stemming.js";
import { inflateRaw } from "zlib";

const Word_Set = new Set();

const AllFilesWords = [];

const allFileData = JSON.parse(fs.readFileSync("./allFileData.json","utf-8"));

const files = fs.readdirSync("./DOCS");

const FILES_INCLUDED = JSON.parse(fs.readFileSync("./filesIncluded.json","utf-8"));

for (const filename of files) {
    if (FILES_INCLUDED.includes(filename)) {
        continue;
    } else {

        const readDocBuf = fs.readFileSync(`./DOCS/${filename}`);
        const DocContent = String(readDocBuf);
        const AllWords = DocContent.split(" ")
        // console.log(AllWords)
        for (const word of AllWords) {
            const WORD = Clean(word);
            AllFilesWords.push(WORD);
            // Word_Set.add(WORD)
        }
        for(const word of AllFilesWords){
            Word_Set.add(word);
        }
        FILES_INCLUDED.push(filename);
    }
}

// todo -> rn all words are considered acroos all files, the correct thing would be all words mapped to their frequency of the current file's words

for (const filename of files) {
    if(!allFileData.includes(filename)){
            const fileobj = {
                totalWords : AllFilesWords.length,
            };
            for(const ref_word of AllFilesWords){
                let count = 0;
            for(const word of AllFilesWords){
                if(ref_word===word){
                        count++;
                        fileobj[word] = count;
                    }
            }
            }

            allFileData.push([filename,fileobj])
}
}

fs.writeFileSync("./filesIncluded.json",JSON.stringify(FILES_INCLUDED,null,2))
fs.writeFileSync('./allFileData.json',JSON.stringify(allFileData,null,2));

const content = ["",...Word_Set].join('\n')

const stream = fs.createWriteStream("./Words.txt",{
    flags:"a+"
});
for (const word of content) {
    stream.write(word);
}
stream.close();