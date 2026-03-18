import fs from "fs"
import Clean from "./stemming.js";

export default async function giveTF(filename){
    const allWordsRaw = String(fs.readFileSync(`./Words.txt`));
    const allWordsCleaning = allWordsRaw.split("\n");
    const allWordsCleanedSet = new Set();
    for(const word  of allWordsCleaning){
        allWordsCleanedSet.add(Clean(word));
    }
    const allWordsCleaned = [...allWordsCleanedSet]
    // console.log(allWordsCleaned)
    let allFileData = JSON.parse(fs.readFileSync("./allFileData.json","utf-8"));
    let flag = false;
    for(const filedata of allFileData){
        if(filedata['filename']===filename){
            flag  = true;
        }
    }
    let fileDataObject;
    if(flag){
        return;
    }else{
        fileDataObject = {
        "filename":filename,
        }
    }
    let fileWords = fs.readFileSync(`./DOCS/${filename}`,"utf-8").split(" ");
    const cleanedFileWords = [];
    for(const word of fileWords){
        cleanedFileWords.push(Clean(word))
    }
    fileDataObject["totalVocab"] = cleanedFileWords.length;
    for(const ref_word of allWordsCleaned){
        let count = 0;
        for(const word of cleanedFileWords){
            if(ref_word==word){
                count++;
            }
        }
        fileDataObject[ref_word] = {
            frequency : count,
            tf: count/(fileDataObject["totalVocab"]+1)
        } ;
    }
    console.log(fileDataObject)

    allFileData.push(fileDataObject);

    fs.writeFileSync("./allFileData.json",JSON.stringify(allFileData,null,2))

}
