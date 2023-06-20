import { times } from "./times";

const getWorkingTimes = (openingTime:string, closingTime:string) => {
    let workingTimes = [] as {
      displayTime: string;
      time: string;
      searchTimes: string[];
    }[];
    let isOpen = false;

    times.forEach(time => {
        if(time.time === openingTime){
            isOpen = true;
            workingTimes.push(time)
            return
        }
        if(time.time === closingTime){
            isOpen = false;
            workingTimes.push(time)
            return
        }
        if(isOpen) workingTimes.push(time)
    });

    return workingTimes
}
 
export default getWorkingTimes;