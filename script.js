// "WORD COUNTER JAVA SCRIPT CODE BY NOZAMA "

// Get the textarea element
const textarea = document.getElementById("textInput")

// Get all the counter elements
const characterCountElement = document.getElementById("characterCount")
const wordCountElement = document.getElementById("wordCount")
const sentenceCountElement = document.getElementById("sentenceCount")

// Get timer elements
const minutesElement = document.getElementById("minutes")
const secondsElement = document.getElementById("seconds")
const startBtn = document.getElementById("startBtn")
const stopBtn = document.getElementById("stopBtn")
const resetBtn = document.getElementById("resetBtn")

// Get results elements
const resultsElement = document.getElementById("results")
const timeSpentElement = document.getElementById("timeSpent")
const finalWordCountElement = document.getElementById("finalWordCount")
const wpmElement = document.getElementById("wpm")

// Timer variables
let startTime
let endTime
let timerInterval
let isRunning = false
let totalSeconds = 0

// Add event listener for input changes
textarea.addEventListener("input", () => {
  const text = textarea.value

  // Count characters (including spaces)
  const characterCount = text.length
  characterCountElement.textContent = characterCount

  // Count words
  const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length
  wordCountElement.textContent = wordCount

  // Count sentences (simple version)
  const sentenceCount = text.trim() === "" ? 0 : text.split(/[.!?]+/).length - 1
  sentenceCountElement.textContent = sentenceCount < 0 ? 0 : sentenceCount
})

// Start timer function
function startTimer() {
  if (!isRunning) {
    startTime = new Date()
    isRunning = true

    // Enable textarea and stop button, disable start button
    textarea.disabled = false
    textarea.focus()
    startBtn.disabled = true
    stopBtn.disabled = false

    // Hide results if they were shown
    resultsElement.style.display = "none"

    // Start the timer interval
    timerInterval = setInterval(updateTimer, 1000)
  }
}

// Stop timer function
function stopTimer() {
  if (isRunning) {
    clearInterval(timerInterval)
    endTime = new Date()
    isRunning = false

    // Disable textarea and stop button, enable start button
    textarea.disabled = true
    stopBtn.disabled = true
    startBtn.disabled = false

    // Calculate and display results
    displayResults()
  }
}

// Reset timer function
function resetTimer() {
  clearInterval(timerInterval)
  isRunning = false
  totalSeconds = 0

  // Reset timer display
  minutesElement.textContent = "00"
  secondsElement.textContent = "00"

  // Reset counters
  characterCountElement.textContent = "0"
  wordCountElement.textContent = "0"
  sentenceCountElement.textContent = "0"

  // Clear textarea
  textarea.value = ""

  // Reset buttons
  textarea.disabled = true
  startBtn.disabled = false
  stopBtn.disabled = true

  // Hide results
  resultsElement.style.display = "none"
}

// Update timer display
function updateTimer() {
  totalSeconds++

  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  minutesElement.textContent = minutes < 10 ? "0" + minutes : minutes
  secondsElement.textContent = seconds < 10 ? "0" + seconds : seconds
}

// Format time for display (mm:ss)
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  return `${minutes < 10 ? "0" + minutes : minutes}:${remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds}`
}

// Display results
function displayResults() {
  // Calculate time spent in seconds
  const timeSpent = totalSeconds

  // Get final word count
  const finalWordCount = Number.parseInt(wordCountElement.textContent)

  // Calculate words per minute (WPM)
  const minutes = timeSpent / 60
  const wpm = minutes > 0 ? Math.round(finalWordCount / minutes) : 0

  // Update results elements
  timeSpentElement.textContent = formatTime(timeSpent)
  finalWordCountElement.textContent = finalWordCount
  wpmElement.textContent = wpm

  // Show results
  resultsElement.style.display = "block"
}

// Add event listeners for buttons
startBtn.addEventListener("click", startTimer)
stopBtn.addEventListener("click", stopTimer)
resetBtn.addEventListener("click", resetTimer)