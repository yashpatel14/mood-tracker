function saveMood(mood) {
  let today = new Date().toLocaleDateString();
  let moods = JSON.parse(localStorage.getItem("moods")) || [];

  // Check if a mood is already saved for today
  let existingIndex = moods.findIndex((entry) => entry.date === today);
  // Update the existing mood
  if (existingIndex !== -1) {
    moods[existingIndex].mood = mood;
  } else {
    moods.push({ date: today, mood: mood });
  }

  localStorage.setItem("moods", JSON.stringify(moods));
//   displayMoods();
  calander();
  removeClass();
}

function displayMoods() {
  let moods = JSON.parse(localStorage.getItem("moods")) || [];
  let moodLog = document.getElementById("mood-log");
  moodLog.innerHTML = "";
  moods.forEach((entry) => {
    let li = document.createElement("li");
    li.textContent = `${entry.date}: ${entry.mood}`;
    moodLog.appendChild(li);
  });
}

function calander() {
  var calendarEl = document.getElementById("calendar");
  let localMood = JSON.parse(localStorage.getItem("moods"));
//   console.log(localMood);

if (!localMood.length) {
    console.warn("No mood data found.");
    return; // Exit function if no data
  }

  const moodInCalander = localMood.map((data) => ({
    title: `${data.mood}`,
    start: convertToISOFormat(data.date) || new Date().toISOString().split("T")[0],
    allDay: true,
  }));
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialDate: new Date().toISOString().split("T")[0],
    editable: true,
    selectable: true,
    businessHours: true,
    dayMaxEvents: true, 
    events: moodInCalander,
  });
  calendar.render();
}

function convertToISOFormat(dateString) {
  let parts = dateString.split("/");

  if (parts.length === 3) {
    let [month, day, year] = parts.map((num) => num.padStart(2, "0")); 
    return `${year}-${month}-${day}`;
  }
//   console.log(dateString);
  return dateString;
}

function removeClass() {
  document.querySelectorAll(".fc-event").forEach((element) => {
    element.classList.remove(
      "fc-event-bg-color",
      "fc-event-border-color",
      "fc-h-event"
    );
  });
}

// displayMoods();
calander();
removeClass();
