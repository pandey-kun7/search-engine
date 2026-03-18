export default function sortResults(a,b){
        if(a[0]>b[0]){
            return 1;
        }
        if(a[0]<b[0]){
            return -1;
        }
        if(a[0]===b[0]){
            return 0;
        }
}