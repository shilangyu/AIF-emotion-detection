function supportsWebcam() {
  return !!navigator.mediaDevices?.getUserMedia;
}

export const webcamResolution = 480;

export async function initWebcam(
  videoElement: HTMLVideoElement,
  onLoaded: () => void
) {
  if (!supportsWebcam()) {
    alert("Your browser does not support webcams");
    return;
  }

  try {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: webcamResolution,
        height: webcamResolution,
      },
    });

    videoElement.srcObject = mediaStream;
    videoElement.addEventListener("loadeddata", onLoaded);
  } catch (e) {
    alert(`Failed to initialize webcam stream: ${e}`);
  }
}
