import React, { useRef, useEffect, useState } from "react";
import "./videopage.css";
import io from "socket.io-client";
const socket = io("/webRTCPeers", {
  path: "/webrtc",
});
const VideoPage = () => {
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  const pc = useRef(new RTCPeerConnection(null));
  const textRef = useRef();
  //const candidates = useRef([]);
  const [offerVisible, setOfferVisible] = useState(true);
  const [answerVisible, setAnswerVisible] = useState(false);
  const [status, setStatus] = useState("Make a call now");
  useEffect(() => {
    socket.on("connection-success", (success) => {
      console.log(success);
    });
    socket.on("sdp", (data) => {
      console.log(data);
      pc.current.setRemoteDescription(new RTCSessionDescription(data.sdp));
      textRef.current.value = JSON.stringify(data.sdp);
      if (data.sdp.type === "offer") {
        setOfferVisible(false);
        setAnswerVisible(true);
        setStatus("Incoming call ...");
      } else {
        setStatus("Call established");
      }
    });
    socket.on("candidate", (candidate) => {
      console.log(candidate);
      //candidates.current = [...candidates.current, candidate];
      pc.current.addIceCandidate(new RTCIceCandidate(candidate));
    });
    const constraints = {
      audio: true,
      video: true,
    };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        //display video
        localVideoRef.current.srcObject = stream;
        stream.getTracks().forEach((tract) => {
          _pc.addTrack(tract, stream);
        });
      })
      .catch((error) => console.log("getUserMedia error ...", error));
    const _pc = new RTCPeerConnection(null);
    _pc.onicecandidate = (e) => {
      if (e.candidate) {
        console.log(JSON.stringify(e.candidate));
        sendToPeer("candidate", e.candidate);
      }
    };
    _pc.oniceconnectionstatechange = (e) => {
      console.log(e);
    };
    _pc.ontrack = (e) => {
      // we got remot stream ...
      remoteVideoRef.current.srcObject = e.streams[0];
    };
    pc.current = _pc;
  }, []);
  const sendToPeer = (eventType, payload) => {
    socket.emit(eventType, payload);
  };
  const processSDP = (sdp) => {
    console.log(JSON.stringify(sdp));
    pc.current.setLocalDescription(sdp);
    sendToPeer("sdp", { sdp });
  };
  const createOffer = () => {
    pc.current
      .createOffer({
        offerToReceiveAudio: 1,
        offerToReceiveVideo: 1,
      })
      .then((sdp) => {
        // console.log(JSON.stringify(sdp));
        // pc.current.setLocalDescription(sdp);
        // // send the sdp to the server
        // socket.emit("sdp", {
        //   sdp,
        // });
        processSDP(sdp);
        setOfferVisible(false);
        setStatus("Calling ...");
      })
      .catch((e) => console.log(e));
  };
  const createAnswer = () => {
    pc.current
      .createAnswer({
        offerToReceiveAudio: 1,
        offerToReceiveVideo: 1,
      })
      .then((sdp) => {
        // console.log(JSON.stringify(sdp));
        // pc.current.setLocalDescription(sdp);
        // send the answer sdp to the offering peer
        // socket.emit("sdp", {
        //   sdp,
        // });
        processSDP(sdp);
        setAnswerVisible(false);
        setStatus("Call established");
      })
      .catch((e) => console.log(e));
  };
  //   const setRemoteDescription = () => {
  //     // get the SDP value from the text editor
  //     const sdp = JSON.parse(textRef.current.value);
  //     console.log(sdp);
  //     pc.current.setRemoteDescription(new RTCSessionDescription(sdp));
  //   };
  //   const addCandidate = () => {
  //     // get the candidate value from the text editor
  //     //const candidate = JSON.parse(textRef.current.value);
  //     //console.log(candidate);
  //     candidates.current.forEach((candidate) => {
  //       console.log(candidate);
  //       pc.current.addIceCandidate(new RTCIceCandidate(candidate));
  //     });
  //   };
  const showHideButtons = () => {
    if (offerVisible) {
      return (
        <div>
          <button onClick={createOffer}>Call</button>
        </div>
      );
    } else if (answerVisible) {
      return (
        <div>
          <button onClick={createAnswer}>Answer</button>
        </div>
      );
    }
  };
  return (
    <>
      <div className="flex justify-around flex-wrap ">
        <video
          autoPlay
          className="w-screen h-[15.363rem] bg-black "
          ref={localVideoRef}
        ></video>
        <div className="w-screen h-2 bg-white"></div>
        <video
          autoPlay
          className="w-screen h-[15.363rem] bg-black"
          ref={remoteVideoRef}
        ></video>
        <br />
        {/* <button onClick={createOffer}>Create Offer</button>
        <button onClick={createAnswer}>Create Answer</button> */}
        {showHideButtons()}
        <div>{status}</div>
        <br />
        <textarea ref={textRef} cols="45" className="hidden"></textarea>

        <br />
        {/* <button onClick={setRemoteDescription}>Set Remote Description</button>
        <button onClick={addCandidate}>Add Candidates</button> */}
      </div>
    </>
  );
};

export default VideoPage;
