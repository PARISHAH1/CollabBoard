import React, { useRef, useEffect, useState } from "react";
import "../App.css";
import io from "socket.io-client";
import Peer from "simple-peer";

const socket = io("http://localhost:5000"); // Update this URL when backend is ready

const VideoCall = () => {
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [callAccepted, setCallAccepted] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callEnded, setCallEnded] = useState(false);
  const [me, setMe] = useState("");

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((currentStream) => {
      setStream(currentStream);
      if (myVideo.current) {
        myVideo.current.srcObject = currentStream;
      }
    });

    socket.on("me", (id) => {
      setMe(id);
    });

    socket.on("callUser", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setCallerSignal(data.signal);
    });
  }, []);

  const callUser = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
      });
    });

    peer.on("stream", (currentStream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = currentStream;
      }
    });

    socket.on("callAccepted", (signal) => {
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

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: caller });
    });

    peer.on("stream", (currentStream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = currentStream;
      }
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
    window.location.reload();
  };

  return (
    <div className="page videocall">
      <h1><span className="highlight">Video Call Room</span></h1>
      <div className="video-container">
        <div className="video-box">
          <video playsInline muted ref={myVideo} autoPlay className="video" />
        </div>
        <div className="video-box">
          {callAccepted && !callEnded ? (
            <video playsInline ref={userVideo} autoPlay className="video" />
          ) : null}
        </div>
      </div>

      <div className="call-controls">
        <input
          placeholder="Enter ID to call"
          onChange={(e) => setCaller(e.target.value)}
          className="input"
        />
        <button className="btn green" onClick={() => callUser(caller)}>Start Call</button>
        {receivingCall && !callAccepted ? (
          <button className="btn green" onClick={answerCall}>Answer Call</button>
        ) : null}
        <button className="btn red" onClick={leaveCall}>End Call</button>
      </div>
    </div>
  );
};

export default VideoCall;
