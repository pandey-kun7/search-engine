export default function Clean(word){
    let cleaned_word = "";
    const ALLOWED_CHARACTERS = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890'"
    for(const char of word){
        if(ALLOWED_CHARACTERS.includes(char)){
            const clean_char = char.toLowerCase();
            if(char !== "" || char!==" " || char!=="\r" || char!=="\n"){
                cleaned_word+=clean_char;

            }else{
                continue;
            }
        }
    }
    // console.log(cleaned_word)
    return cleaned_word;
}

// Clean("\"Hello%%^%^ \"")