const textArea = document.getElementById("input").value;
const getHoursBtn = document.getElementById("get--hours");
const main = document.getElementById("main");
const monthList = document.getElementById("month");
const clearBtn = document.getElementById('clear')
let monthPrefix;
let monthName;
let title;
let thisMonth = [];
let workingMs = [];
let dataNoLunch = [];
let dataWithTime = [];
let totalWorkingHrs;

monthList.addEventListener("change", function () {
  monthPrefix = this.value;
  monthName = monthList.options[monthList.selectedIndex].text;
});

getHoursBtn.addEventListener("click", getData);
clearBtn.addEventListener("click", clearAll);

function clearAll() {
  browser.runtime.restart()
}

function msToTime(ms) {
  let minutes = (ms / (1000 * 60)).toFixed(1);
  let hours = (ms / (1000 * 60 * 60)).toFixed(1);
  if (minutes < 60) return minutes + "Min";
  else return hours + " hrs";
}

function renderTotal() {
  main.innerHTML += `
    <div class='results'>
      <h2>⏱ You've worked ${totalWorkingHrs} in ${monthName}</h2>
    </div>
    `;
}

function renderProjects() {
  let result = [];

  for (let i = 0; i < dataWithTime.length; i++) {
    let data = dataWithTime[i];
    let found = false;
    for (let j = 0; j < result.length; j++) {
      if (result[j].title === data.title) {
        found = true;
        result[j].totalTimeSpent += data.totalTimeSpent;
      }
    }
    if (!found) {
      result.push(data);
    }
  }
  result.map((el) => {
    if ((el.start && el.end).includes(monthPrefix)) {
     main.innerHTML += `
    <div class='project--total'>
    <h3>✔️ ${msToTime(el.totalTimeSpent)} for ${el.title}</h3>
    </div>
    ` 
    } else {
      main.innerHTML += ''
    }
    
    
  });
}

function isLunchIncluded(start, end) {
  const startHour = new Date(start).getHours();
  const endHour = new Date(end).getHours();
  return startHour < 13 && endHour >= 14;
}

function getData() {
  const data = JSON.parse(document.getElementById("input").value);

  data.filter((el) => {
    if (!el.title.includes("Lunch")) dataNoLunch.push(el);
  });

  dataWithTime = dataNoLunch.map((item) => {
    const endTime = item.endLong;
    const startTime = item.startLong;
    let totalTimeSpent = endTime - startTime;
    title = item.title.substring(0, item.title.indexOf("-"));
    if (isLunchIncluded(startTime, endTime)) {
      totalTimeSpent -= 60 * 60 * 1000;
    }
    return {
      ...item,
      title,
      totalTimeSpent,
    };
  });

  dataWithTime.filter((el) => {
    if (el.start.includes(monthPrefix)) {
      thisMonth.push(el);
    }
  });

  thisMonth.map((item) => {
    workingMs.push(item.totalTimeSpent);
  });
  const totalWorkingMs = workingMs.reduce((a, b) => a + b, 0);
  totalWorkingHrs = msToTime(totalWorkingMs);
  renderTotal();
  renderProjects();
}
