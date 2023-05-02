import { LatLng } from "use-places-autocomplete";
let destinationArray: any[] = [];
let distanceMatrix: any[] = [];
let Combinatorics: string[] = [];
let CombinatoricsSum: number[] = [];
let minimumSum: number;
let minimumIndex;
let orderedArray: any[] = [];
const convertStringToNumber = (str: string) => {
    for (let index = 0; index < str.length; index++) {
        const element = str[index];
        if (element == ' ') {
            return Number(str.slice(0, index));
        }
    }
}
const allCombinorics = (num: string) => {
    if (num == '') {
        return [""];
    }
    let combinaturics: string[] = [];
    let combinaturicsFromRecursive: string[] = [];
    for (let index = 0; index < num.length; index++) {
        let s: string = num.slice(0, index) + num.slice(index + 1, num.length);
        //num.slice(0,index-1)+num.slice(index,num.length);
        combinaturicsFromRecursive = allCombinorics(s);
        for (let Jndex = 0; Jndex < combinaturicsFromRecursive.length; Jndex++) {
            combinaturics.push(num[index] + combinaturicsFromRecursive[Jndex]);

        }
    }
    return combinaturics;
}
export default async function getOrderedArray(home: LatLng, latLngArr: google.maps.LatLng[], priority: number[]) {
if(latLngArr.length==0)
{
return [];
}
    destinationArray = [home, ...latLngArr];

    let s: string = "";
    for (let index = 1; index < destinationArray.length; index++) {
        s += index;
    }
    //מכיל את כל הקומבינציות האפשריות לא כולל נקודת המוצא(במספרים)
    Combinatorics = allCombinorics(s);
    //הוספת נקודת המוצא בראש כל קומבינציה
    for (let index = 0; index < Combinatorics.length; index++) {
        Combinatorics[index] = "0" + Combinatorics[index] + "0";
    }
    //השמת ערכים במערך כדי שלא יוצר מצב של גישה למקום לא קיים
    for (let index = 0; index < Combinatorics.length; index++) {
        CombinatoricsSum.push(0.0);
        console.log(CombinatoricsSum[index]);

    }
    //מעבר על כל המחרוזות וסכימה במערך תואם את כל ערכי הקשתות שבין כל תו לתו    
    var service = new google.maps.DistanceMatrixService();
    if (latLngArr.length > 0) {
        await service.getDistanceMatrix(
            {
                origins: destinationArray,
                destinations: destinationArray,//props.latLngArr,//[origin1,origin2], //[...latLngArr],
                travelMode: google.maps.TravelMode.DRIVING,
            }, (data, status) => { console.log(status + "status"); callback2(data, status); });
    }
    // for (let index = 0; index < Combinatorics.length; index++) {
    //     const element = Combinatorics[index];
    //     for (let Jndex = 0; Jndex < element.length-1; Jndex++) {
    //         const jelement = element[Jndex];
    //         //סכימת הדרכים של כל אחת המקומבינטוריקות

    //     }

    // }

    for (let index = 0; index < Combinatorics.length; index++) {
        for (let indexJ = 0; indexJ < Combinatorics[index].length - 1; indexJ++) {
            //תו בודד
            const from = Combinatorics[index][indexJ];
            const to = Combinatorics[index][indexJ + 1];
            if (distanceMatrix.length > 0) {
                CombinatoricsSum[index] += distanceMatrix[+from][+to].distance;
            }
        }

    }
    //הוצאת המינימום מהמערך של הסכומים
    minimumSum = CombinatoricsSum[0];
    minimumIndex = 0;
    for (let index = 1; index < CombinatoricsSum.length; index++) {
        if (CombinatoricsSum[index] < minimumSum) {
            minimumSum = CombinatoricsSum[index];
            minimumIndex = index;
        }

    }

    const orderedTracknNUmbers = Combinatorics[minimumIndex];
    console.log(orderedTracknNUmbers);
    if(orderedTracknNUmbers){
        for (let index = 0; index < orderedTracknNUmbers.length; index++) {
            orderedArray.push(destinationArray[+orderedTracknNUmbers[index]]);
        }
    }
    //מיון לפי מרחק מהקטן לגדול
    // distanceMatrix.sort(function (a, b) { return (a.distance < b.distance) ? -1 : (a.distance == b.distance) ? 0 : 1 })
    // console.log(distanceMatrix);
    // debugger;


    return orderedArray;
}
function callback2(data: google.maps.DistanceMatrixResponse | null, status: google.maps.DistanceMatrixStatus) {
    console.log(data);
    if (data != null) {
        for (let i = 0; i < data.rows.length; i++) {
            let distance: any[] = [];
            for (let j = 0; j < data.rows[i].elements.length; j++) {
                distance.push({
                    source: i,
                    destination: j,
                    distance: convertStringToNumber(data.rows[i].elements[j].distance.text),
                    value: data.rows[i].elements[j].distance.value
                });

            }
            distanceMatrix.push(distance);
        }
    }
    console.log(distanceMatrix);

    console.log("in callback");
}
