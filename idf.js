import fs from "fs"

export default function giveIDF(){
    const ALLFILEDATA = JSON.parse(fs.readFileSync("./allFileData.json","utf-8"));
    // console.log(ALLFILEDATA)
    const docsInCorpus = [];
    for(const file of Object.values(ALLFILEDATA)){
        docsInCorpus.push(file["filename"]);
    }
    console.log(docsInCorpus)
    const wordInCorpusInfo = {};
    for(const file of Object.values(ALLFILEDATA)){
        for(const word in file){
            if(word!=='filename' && word!=='totalVocab'){
                wordInCorpusInfo[word]={
                    "len":0,
                }
            }
        }
    } 
    for(const file of Object.values(ALLFILEDATA)){
        for(const word in file){
            // console.log("->",word);
            if(file[word]["frequency"]>0 && word!=='filename' && word!=='totalVocab'){
                wordInCorpusInfo[word]["len"]++;
                // console.log(wordInCorpusInfo[word]["len"])
            }
        }
    }
    for(const file of Object.values(ALLFILEDATA)){
        for(const word in file){
            if(file[word]["frequency"]>0 && word!=='filename' && word!=='totalVocab'){
                console.log(Math.log(((docsInCorpus.length)+1)/(wordInCorpusInfo[word]["len"]+1)))
                file[word]["idf"] = String(Math.log(((docsInCorpus.length)+1)/(wordInCorpusInfo[word]["len"]+1)));
                console.log(file[word]["idf"])
                // break;
                file[word]["weight"] = String(Number(file[word]["tf"])*Number(file[word]["idf"]));
            }
        }
    }
    fs.writeFileSync("./allFileData.json",JSON.stringify(ALLFILEDATA,null,2));
}

giveIDF();