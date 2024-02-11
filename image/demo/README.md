# Demo of image emotion detection

Description of the procedure:

1. Models are downloaded
2. Webcam is started
3. In real-time every frame is processed:
   1. Get a still image
   2. Pass it to the [blazeface model](https://arxiv.org/abs/1907.05047) to extract the face
   3. Normalize
   4. Pass to our emotion detection model
   5. Display resulting label (based off argmax of the output)
4. If debug is on, a small preview of the processed input image is shown
5. If debug is on, a bar chart with the output distribution is shown

## Prerequisites

To run the demo locally you will need [node](https://nodejs.org/en/download) and `npm` installed on your system. A modern browser will also be needed (preferably a chromium-based one).

## Run locally

Enter the demo directory and run the following

```sh
npm install # installs dependencies
npm run dev # build and host locally (if free, will be available on port 3000)
```

Then visit `https://localhost:<hosted-port>`.

## Model

The model has to be hosted somewhere. Since it's rather large (20MB+) it is not in the repository, but can be found [in the releases](https://github.com/shilangyu/AIF-emotion-detection/releases/tag/images-v0.1.0) (`tfjs_model.zip`). Currently the converted TF.js model is hosted on my private VPS (see the `.env` file). To point the app to a different model use the `VITE_TFJS_MODEL_URL` environment variable. `VITE_TFJS_MODEL_URL` has to point to the `model.json` manifest, and the model `bin` files should be in the same directory as `model.json`.

## Hosted version

If my server is still running, you can find the hosted version at [github.shilangyu.dev/AIF-emotion-detection](https://github.shilangyu.dev/AIF-emotion-detection). Open the js console and enter `window.debug = true` to see some extra debug info.
