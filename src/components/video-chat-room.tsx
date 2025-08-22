// 'use client';
// import React, { useEffect, useRef, useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { IconPhone, IconPhoneOff, IconVideo, IconVideoOff, IconMicrophone, IconMicrophoneOff, IconMaximize } from '@tabler/icons-react';
// import { AlertDialog, AlertDialogTrigger, AlertDialogPortal, AlertDialogOverlay } from '@/components/ui/alert-dialog';
// import { useAuthStore } from "@/lib/store/authSlice";

// // Helper to get JWT from cookie
// function getAccessTokenFromCookie() {
//   if (typeof document === 'undefined') return '';
//   const match = document.cookie.match(/(^|;) ?access_token=([^;]*)(;|$)/);
//   return match ? match[2] : '';
// }

// // Setup signaling WebSocket
// function useSignalingSocket() {
//   const wsRef = useRef<WebSocket | null>(null);

//   useEffect(() => {
//     if (typeof window === 'undefined') return;
//     const token = getAccessTokenFromCookie();
//     const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
//     const wsUrl = `${protocol}://localhost:8080/api/v1/signaling/ws${token ? `?token=${token}` : ''}`;
//     const ws = new WebSocket(wsUrl);
//     wsRef.current = ws;

//     ws.onopen = () => console.log('WebRTC signaling WebSocket connected');
//     ws.onmessage = (event) => {
//       const signal = JSON.parse(event.data);
//       // Handle signaling message (SDP/ICE)
//     };
//     ws.onerror = (event) => console.error('Signaling WebSocket error', event);
//     ws.onclose = (event) => console.warn('Signaling WebSocket closed', event);

//     return () => ws.close();
//   }, []);

//   return wsRef;
// }

// const WS_URL =
//   typeof window !== 'undefined' && window.location.protocol === 'https:'
//     ? 'wss://localhost:8080/api/v1/chat/ws'
//     : 'ws://localhost:8080/api/v1/chat/ws';

// const VideoChatRoom: React.FC = () => {
//   const localVideoRef = useRef<HTMLVideoElement>(null);
//   const remoteVideoRef = useRef<HTMLVideoElement>(null);
//   const signalingSocket = useSignalingSocket();
//   const [peerConnection, setPeerConnection] = useState<RTCPeerConnection | null>(null);
//   const [cameraOn, setCameraOn] = useState(true);
//   const [audioOn, setAudioOn] = useState(true);
//   const [users, setUsers] = useState<{ id: string; name: string }[]>([]);
//   const [selectedUser, setSelectedUser] = useState<string | null>(null);
//   const [incomingCall, setIncomingCall] = useState<{ from: string; callId: string } | null>(null);
//   const [showIncomingDialog, setShowIncomingDialog] = useState(false);

//   const accessToken = useAuthStore((state) => state.accessToken);

//   // Fullscreen handlers
//   const handleFullscreen = (ref: React.RefObject<HTMLVideoElement>) => {
//     if (ref.current) {
//       if (ref.current.requestFullscreen) ref.current.requestFullscreen();
//     }
//   };

//   // Camera toggle
//   const toggleCamera = () => {
//     if (localVideoRef.current?.srcObject) {
//       (localVideoRef.current.srcObject as MediaStream)
//         .getVideoTracks()
//         .forEach(track => (track.enabled = !cameraOn));
//       setCameraOn(!cameraOn);
//     }
//   };

//   // Audio toggle
//   const toggleAudio = () => {
//     if (localVideoRef.current?.srcObject) {
//       (localVideoRef.current.srcObject as MediaStream)
//         .getAudioTracks()
//         .forEach(track => (track.enabled = !audioOn));
//       setAudioOn(!audioOn);
//     }
//   };

//   // Fetch users from backend
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const res = await fetch('http://localhost:8080/api/v1/users', {
//           credentials: 'include',
//           headers: accessToken
//             ? { Authorization: `Bearer ${accessToken}` }
//             : {},
//         });
//         if (!res.ok) {
//           const text = await res.text();
//           console.error('Fetch failed:', res.status, text);
//           setUsers([]);
//           return;
//         }
//         const data = await res.json();
//         if (!Array.isArray(data)) {
//           console.error('Expected array, got:', data);
//           setUsers([]);
//           return;
//         }
//         setUsers(
//           data.map((user: any) => ({
//             id: user.ID?.toString() ?? user.id?.toString(),
//             name: user.name || user.email,
//           }))
//         );
//       } catch (err) {
//         console.error('Failed to fetch users', err);
//         setUsers([]);
//       }
//     };
//     fetchUsers();
//   }, [accessToken]);

//   // Listen for incoming call requests (example: via WebSocket or polling)
//   useEffect(() => {
//     // Replace with your real-time signaling logic
//     const ws = new WebSocket(WS_URL);
//     ws.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       if (data.type === 'incoming_call') {
//         setIncomingCall({ from: data.from, callId: data.callId });
//         setShowIncomingDialog(true);
//       }
//     };
//     return () => ws.close();
//   }, []);

//   // Handle answer/decline
//   const handleAnswer = async () => {
//     setShowIncomingDialog(false);
//     // Notify backend to join call
//     await fetch('http://localhost:8080/api/v1/webrtc/answer', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ callId: incomingCall?.callId }),
//       credentials: 'include',
//     });
//     // Add user to video call (your existing logic)
//     // ...
//   };

//   const handleDecline = async () => {
//     setShowIncomingDialog(false);
//     // Notify backend to send "No answer" to requester
//     await fetch('http://localhost:8080/api/v1/webrtc/decline', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ callId: incomingCall?.callId }),
//       credentials: 'include',
//     });
//   };

//   // Start video chat
//   const startVideoChat = async () => {
//     if (!selectedUser) {
//       alert('Please select a user to call.');
//       return;
//     }

//     // Notify backend of call request (before starting WebRTC)
//     await fetch('http://localhost:8080/api/v1/webrtc/request', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ callee: selectedUser }),
//       credentials: 'include',
//     });

//     try {
//       const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//       if (localVideoRef.current) {
//         localVideoRef.current.srcObject = localStream;
//       }

//       const pc = new RTCPeerConnection();
//       localStream.getTracks().forEach((track) => pc.addTrack(track, localStream));

//       pc.ontrack = (event) => {
//         if (remoteVideoRef.current) {
//           remoteVideoRef.current.srcObject = event.streams[0];
//         }
//       };

//       pc.onicecandidate = (event) => {
//         if (event.candidate) {
//           fetch('http://localhost:8080/api/v1/webrtc/start', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ ice: event.candidate, callee: selectedUser }),
//           });
//         }
//       };

//       const offer = await pc.createOffer();
//       await pc.setLocalDescription(offer);

//       const response = await fetch('http://localhost:8080/api/v1/webrtc/start', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ offer, callee: selectedUser }),
//       });

//       const data = await response.json();
//       console.log('Signaling response:', data);
//       const { answer } = data;
//       if (answer && answer.type === 'answer') {
//         await pc.setRemoteDescription(new RTCSessionDescription(answer));
//       } else {
//         console.error('Invalid answer received:', answer);
//       }

//       setPeerConnection(pc);
//     } catch (err) {
//       console.error('Could not start video source', err);
//       alert('Could not start video source: ' + (err && err.message ? err.message : 'Unknown error'));
//       return;
//     }
//   };

//   const stopVideoChat = () => {
//     if (peerConnection) {
//       peerConnection.close();
//       setPeerConnection(null);
//     }
//     if (localVideoRef.current) {
//       (localVideoRef.current.srcObject as MediaStream).getTracks().forEach((track) => track.stop());
//     }
//     if (remoteVideoRef.current && remoteVideoRef.current.srcObject) {
//       (remoteVideoRef.current.srcObject as MediaStream).getTracks().forEach((track) => track.stop());
//     }
//   }; // End stopVideoChat

//   return (
//     <div className="flex flex-col h-full bg-background rounded-lg shadow-md">
//       {/* Incoming Call Dialog */}
//       {incomingCall && (
//         <AlertDialog open={showIncomingDialog} onOpenChange={setShowIncomingDialog}>
//           <AlertDialogPortal>
//             <AlertDialogOverlay />
//             <div className="fixed inset-0 flex items-center justify-center z-50">
//               <div className="bg-white rounded-lg shadow-lg p-6 w-96">
//                 <h2 className="text-lg font-bold mb-2">Incoming Call</h2>
//                 <p className="mb-4">{incomingCall.from} is calling you.</p>
//                 <div className="flex justify-end space-x-2">
//                   <Button variant="default" onClick={handleAnswer}>Answer</Button>
//                   <Button variant="destructive" onClick={handleDecline}>Decline</Button>
//                 </div>
//               </div>
//             </div>
//           </AlertDialogPortal>
//         </AlertDialog>
//       )}
//       {/* User Selector */}
//       <div className="flex items-center px-6 py-2 bg-muted border-b">
//         <span className="mr-4 font-semibold">Select user to call:</span>
//         <select
//           className="border rounded px-2 py-1"
//           value={selectedUser ?? ''}
//           onChange={e => setSelectedUser(e.target.value)}
//         >
//           <option value="" disabled>Select user</option>
//           {users.map((user, idx) => (
//             <option key={`${user.id}-${idx}`} value={user.id}>
//               {user.name}
//             </option>
//           ))}
//         </select>
//       </div>
//       {/* Custom Top Bar */}
//       <div className="flex items-center justify-between px-6 py-4 bg-muted border-b">
//         <div className="flex space-x-2">
//           <Button variant="success" onClick={startVideoChat} title="Start Call">
//             <IconPhone size={20} />
//           </Button>
//           <Button variant="destructive" onClick={stopVideoChat} title="End Call">
//             <IconPhoneOff size={20} />
//           </Button>
//         </div>
//         <div className="flex space-x-2">
//           <Button variant={cameraOn ? 'outline' : 'secondary'} onClick={toggleCamera} title={cameraOn ? "Turn Off Camera" : "Turn On Camera"}>
//             {cameraOn ? <IconVideo size={20} /> : <IconVideoOff size={20} />}
//           </Button>
//           <Button variant={audioOn ? 'outline' : 'secondary'} onClick={toggleAudio} title={audioOn ? "Mute Audio" : "Unmute Audio"}>
//             {audioOn ? <IconMicrophone size={20} /> : <IconMicrophoneOff size={20} />}
//           </Button>
//         </div>
//       </div>
//       {/* Video Grid */}
//       <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-6">
//         <div className="grid grid-cols-2 gap-4 w-full max-w-4xl">
//           <div className="relative">
//             <video ref={localVideoRef} autoPlay playsInline muted className="w-full h-64 rounded-lg border shadow-md" />
//             <Button
//               variant="ghost"
//               className="absolute top-2 right-2"
//               onClick={() => handleFullscreen(localVideoRef)}
//               title="Fullscreen"
//             >
//               <IconMaximize size={18} />
//             </Button>
//           </div>
//           <div className="relative">
//             <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-64 rounded-lg border shadow-md" />
//             <Button
//               variant="ghost"
//               className="absolute top-2 right-2"
//               onClick={() => handleFullscreen(remoteVideoRef)}
//               title="Fullscreen"
//             >
//               <IconMaximize size={18} />
//             </Button>
//           </div>
//         </div>
//       </div>
//       <Button variant="default" onClick={startVideoChat} title="Start Call">
//         <IconPhone size={20} />
//       </Button>
//     </div>
//   );
// };

// export default VideoChatRoom;

