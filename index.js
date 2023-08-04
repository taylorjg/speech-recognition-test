const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const main = () => {
  const startButton = document.getElementById("start-button");
  const stopButton = document.getElementById("stop-button");
  const activeIndicator = document.getElementById("active-indicator");
  const results = document.getElementById("results");
  const clearResultsButton= document.getElementById("clear-results-button");
  const messages = document.getElementById("messages");
  const clearMessagesButton= document.getElementById("clear-messages-button");

  let active = false;

  const start = () => {
    recognition.start();
  };

  const stop = () => {
    recognition.stop();
  };

  const changeActive = (value) => {
    active = value;
    startButton.disabled = active;
    stopButton.disabled = !active;
    activeIndicator.style.visibility = active ? "visible" : "hidden";
  };

  const appendResult = (result) => {
    const { transcript, confidence } = result;
    const formattedResult = `word: ${transcript}; confidence: ${confidence.toFixed(2)}%`;
    results.innerText += "\n" + formattedResult;
  };

  const clearResults = () => {
    results.innerText = "";
  };

  const appendMessage = (message) => {
    messages.innerText += "\n" + message;
  };

  const clearMessages = () => {
    messages.innerText = "";
  };

  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.lang = "en-GB";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = function (event) {
    appendMessage("[onresult]")
    const result = event.results[event.resultIndex][0];
    appendResult(result);
    if (result.transcript.trim() === "stop") {
      stop();
    }
  }

  recognition.onnomatch = () => {
    appendMessage("[onnomatch]");
  }

  recognition.onstart = () => {
    appendMessage("[onstart]");
    changeActive(true);
  }

  recognition.onend = () => {
    appendMessage("[onend]");
    changeActive(false);
  }

  recognition.onaudiostart = () => {
    appendMessage("[onaudiostart]");
  }

  recognition.onaudioend = () => {
    appendMessage("[onaudioend]");
  }

  recognition.onsoundstart = () => {
    appendMessage("[onsoundstart]");
  }

  recognition.onsoundend = () => {
    appendMessage("[onsoundend]");
  }

  recognition.onspeechstart = () => {
    appendMessage("[onspeechstart]");
  }

  recognition.onspeechend = () => {
    appendMessage("[onspeechend]");
  }

  recognition.onerror = (event) => {
    console.log("[onerror]", event);
    const formattedError = `error: ${event.error}; message: ${event.message}`;
    appendMessage(`[onerror] ${formattedError}`);
  }

  const onStartClick = () => {
    clearResults();
    clearMessages();
    appendMessage("[onStartClick]");
    start();
  };

  const onStopClick = () => {
    appendMessage("[onStopClick]");
    stop();
  };

  const onClearResultsClick = () => {
    appendMessage("[onClearResultsClick]");
    clearResults();
  };

  const onClearMessagesClick = () => {
    appendMessage("[onClearMessagesClick]");
    clearMessages();
  };

  startButton.addEventListener("click", onStartClick);
  stopButton.addEventListener("click", onStopClick);
  clearResultsButton.addEventListener("click", onClearResultsClick);
  clearMessagesButton.addEventListener("click", onClearMessagesClick);
};

main();
