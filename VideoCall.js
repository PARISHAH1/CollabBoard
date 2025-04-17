import React, { useRef, useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import io from "socket.io-client";
import Peer from "simple-peer";
import "../App.css";

const socket = io("http://localhost:5000"); // Update to your deployed backend URL if needed

const VideoCall = () => {
  const [me, setMe] = useState("");
  const [stream, setStream] = useState(null);
  const [receivingCall, setReceivingCall] = useState(false);
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  const [idToCall, setIdToCall] = useState("");
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState(null);
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    // Get media stream
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(currentStream => {
        setStream(currentStream);
        if (myVideo.current) {
          myVideo.current.srcObject = currentStream;
        }
      })
      .catch(err => {
        console.error("Error accessing media devices", err);
      });

    // Get own socket ID
    socket.on("me", id => setMe(id));

    // When receiving a call
    socket.on("callUser", ({ from, signal }) => {
      setReceivingCall(true);
      setCaller(from);
      setCallerSignal(signal);
    });

    return () => {
      socket.off("me");
      socket.off("callUser");
    };
  }, []);

  const callUser = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", data => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
      });
    });

    peer.on("stream", currentStream => {
      if (userVideo.current) {
        userVideo.current.srcObject = currentStream;
      }
    });

    socket.on("callAccepted", signal => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", data => {
      socket.emit("answerCall", { signal: data, to: caller });
    });

    peer.on("stream", currentStream => {
      if (userVideo.current) {
        userVideo.current.srcObject = currentStream;
      }
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current?.destroy();
    window.location.reload();
  };

  const toggleMic = () => {
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !micOn;
        setMicOn(!micOn);
      }
    }
  };

  const toggleVideo = () => {
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoOn;
        setVideoOn(!videoOn);
      }
    }
  };

  const shareScreen = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      const screenTrack = screenStream.getVideoTracks()[0];

      if (connectionRef.current) {
        connectionRef.current.replaceTrack(
          stream.getVideoTracks()[0],
          screenTrack,
          stream
        );

        screenTrack.onended = () => {
          connectionRef.current.replaceTrack(
            screenTrack,
            stream.getVideoTracks()[0],
            stream
          );
        };
      }
    } catch (err) {
      console.error("Screen sharing failed:", err);
    }
  };

  const goFullscreen = () => {
    const vidContainer = document.querySelector(".video-container");
    if (vidContainer?.requestFullscreen) {
      vidContainer.requestFullscreen();
    }
  };

  return (
    <div className="page videocall">
      <h1><span className="highlight">Video Call Room</span></h1>

      <div className="video-container">
        <div className="video-box">
          <video playsInline muted ref={myVideo} autoPlay className="video" />
          <p className="video-label">You</p>
        </div>

        {callAccepted && !callEnded && (
          <div className="video-box">
            <video playsInline ref={userVideo} autoPlay className="video" />
            <p className="video-label">Caller</p>
          </div>
        )}
      </div>

      <div className="call-controls">
        <input
          className="input"
          placeholder="Enter ID to Call"
          value={idToCall}
          onChange={(e) => setIdToCall(e.target.value)}
        />
        <CopyToClipboard text={me}>
          <button className="btn blue">Copy Your ID</button>
        </CopyToClipboard>
        <button className="btn green" onClick={() => callUser(idToCall)}>Start Call</button>

        {receivingCall && !callAccepted && (
          <button className="btn green" onClick={answerCall}>Answer Call</button>
        )}

        <button className="btn red" onClick={leaveCall}>End Call</button>

        <div className="extra-controls">
          <button className="btn gray" onClick={toggleMic}>
            {micOn ? "Mute Mic" : "Unmute Mic"}
          </button>
          <button className="btn gray" onClick={toggleVideo}>
            {videoOn ? "Hide Video" : "Show Video"}
          </button>
          <button className="btn gray" onClick={shareScreen}>Share Screen</button>
          <button className="btn gray" onClick={goFullscreen}>Fullscreen</button>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;
