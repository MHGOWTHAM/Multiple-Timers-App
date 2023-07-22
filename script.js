let activeTimers = [];
let interValids = [];

// Function to validate user input
function validateInput(hours, minutes, seconds) {
  const totalSeconds = hours * 3600 + minutes * 60 + seconds;
  return Number.isInteger(hours) && hours >= 0 && hours <= 23 &&
         Number.isInteger(minutes) && minutes >= 0 && minutes < 60 &&
         Number.isInteger(seconds) && seconds >= 0 && seconds < 60 &&
         totalSeconds > 0;
}

// Function to start a new timer
function startTimer(hours, minutes, seconds) {
  const totalSeconds = hours * 3600 + minutes * 60 + seconds;
  const timer = {
    totalSeconds,
    remainingSeconds: totalSeconds
  };

  activeTimers.push(timer);

  // Update active timers display
  displayActiveTimers();

  // Start countdown
  const interValid = setInterval(() => {
    timer.remainingSeconds--;
    if (timer.remainingSeconds < 0 ) {
      clearInterval(interValid);
      handleTimerEnd(timer);
    } else {
      displayActiveTimers();
    }
  }, 1000);

  interValids.push(interValid);
}


// Function to display timers
function displayActiveTimers() {
    const activeTimersSection = document.getElementById('active-timers-section');
    activeTimersSection.innerHTML = '';
  
    activeTimers.forEach((timer, index) => {
      const timerElement = document.createElement('div');
      timerElement.classList.add('timer');
  
      const hours = Math.floor(timer.remainingSeconds / 3600);
      const minutes = Math.floor((timer.remainingSeconds % 3600) / 60);
      const seconds = timer.remainingSeconds % 60;
  
      if (timer.remainingSeconds == -1) {
        timerElement.innerText = "Time's Up";
      } else {
        timerElement.innerText = `${hours.toString().padStart(2, '0')}    :   ${minutes.toString().padStart(2, '0')}    :   ${seconds.toString().padStart(2, '0')}`;
      }
      const info = document.createElement('p');
      info.classList.add('time-left');
      info.innerText = 'Time Left:';
      timerElement.insertBefore(info,timerElement.firstChild);


      const stopButton = document.createElement('button');
      stopButton.innerText = timer.remainingSeconds == 0 ? 'Stop' : 'Delete';
      stopButton.setAttribute('data-timer-index', index);
      stopButton.addEventListener('click', stopTimer);
  
      timerElement.appendChild(stopButton);
      activeTimersSection.appendChild(timerElement);
    });
  }




// Function to handle timer end
function handleTimerEnd(timer) {
    // Show the timer end display (assuming it's hidden with the class "hidden")
    const timerEndDisplay = document.getElementById('timer-end-display');
    timerEndDisplay.classList.add('hidden');
  
    // Play the audio alert
    const alertSound = document.getElementById('alert-sound');
    alertSound.play();
  
    // Remove the timer from the active timers array
    // const index = activeTimers.indexOf(timer);
    // if (index !== -1) {
    //   activeTimers.splice(index, 1);
    //   interValids.splice(index, 1);
    // }
  
    // Update active timers display after timer removal
    displayActiveTimers();
  }

  function stopTimer(event) {
    const timerIndex = event.target.getAttribute('data-timer-index');
    if (timerIndex !== null) {
      clearInterval(interValids[timerIndex]);
      const timer = activeTimers[timerIndex];
  
      // Remove the timer from the active timers array and reset the button functionality
      activeTimers.splice(timerIndex, 1);
      interValids.splice(timerIndex, 1);
  
      // Remove the timer element from the DOM
      const timerElement = event.target.parentNode;
      timerElement.remove();
    }
  }
  

  // Event listener for 'Start New Timer' button
  const startButton = document.getElementById('start-timer-btn');
  
  startButton.addEventListener('click', () => {
    
    const hoursInput = parseInt(document.getElementById('hours').value, 10) || 0;
    const minutesInput = parseInt(document.getElementById('minutes').value, 10) || 0;
    const secondsInput = parseInt(document.getElementById('seconds').value, 10) || 0;
  
    if (validateInput(hoursInput, minutesInput, secondsInput)) {
      startTimer(hoursInput, minutesInput, secondsInput);
    } else {
      alert('Invalid input. Please enter a valid time.');
    }
  });