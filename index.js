let finalResult = {};
const textArea = document.getElementById("input").value
const getHoursBtn = document.getElementById("get--hours");
const main = document.getElementById("main");

getHoursBtn.addEventListener('click', getData)

function msToTime(ms) {
  let minutes = (ms / (1000 * 60)).toFixed(1);
  let hours = (ms / (1000 * 60 * 60)).toFixed(1);
  if (minutes < 60) return minutes + "Min";
  else return hours + " hrs";
}

function sumProjects() {
  for (const [aco, record] of Object.entries(finalResult)) {
    let projectDuration = 0;
    
    record.forEach((element) => { projectDuration += element.totalDuration });
    const totalProjectHrs = msToTime(projectDuration);
    main.innerHTML += 
    `
    <div class='results'>
      <p>You've worked ${totalProjectHrs} for ${aco}</p>  
    </div>
    `

  }
}
function sumTotal() {
    let hours = Object.entries(finalResult)
    let myArray = []
    let anotherArray = []
    hours.map(arr => {
        arr.shift()
        myArray.push(arr)
    })
    
    console.log(myArray)
    for (let i = 0; i < myArray.length; i++) {
        let innerArrayLength = myArray[i].length;
        

        for (let j = 0; j < innerArrayLength; j++) {
         let nextInnerArrayLength = myArray[i][j].length 

         for (let k = 0; k < nextInnerArrayLength; k++) {

            }
            
         }
        }
    
}

function getData() {
        let data = eval(document.getElementById("input").value)
        let dataNoLunch = []
        data = data.filter( el => {
          if (!(el.title).includes("Lunch"))
          dataNoLunch.push(el)
          const endTime = dataNoLunch.endLong;
          const startTime = dataNoLunch.startLong;
          const timeSpentInMs = endTime - startTime;
          // const title = dataNoLunch.title.substring(0, dataNoLunch.title.indexOf("-"))
          
        }) 
        console.log(dataNoLunch)
        
        

      
        // data.map((day) => {
        // const endTime = day.endLong;
        // const startTime = day.startLong;
        // const timeSpentInMs = endTime - startTime;
        // const title = day.title.substring(0, day.title.indexOf("-"));
        // day.totalDuration = timeSpentInMs;
        // if (!Object.hasOwn(finalResult, title)) {
        //   finalResult[title] = [];
        // }
        // finalResult[title].push(day);});
        sumProjects()
        sumTotal()
      } 



   // let value = "Lunch"
          // finalResult = finalResult.filter(item => {
          //   item !== value
          //   console.log(finalResult)
          // })
            // if (title.includes("Lunch")) {
            //   const index = finalResult.indexOf("Lunch")
            //   finalResult.splice(index, 1)
            //   console.log(finalResult)
              
            // } 
// [[[{id: 1010101, title: 'blabla' url: },{},{},{},{},{}]],[],[],[],[],[],[],[],[],[],[],[]]