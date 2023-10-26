import React from 'react'

const RecordingButtons = (startRecording, stopRecording) => {
  return (
      <>
    <button onClick={startRecording}>Start Recording</button>
    <button onClick={stopRecording}>Stop Recording</button>
    </>
  )
}

export default RecordingButtons