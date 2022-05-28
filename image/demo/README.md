# Demo of image emotion detection

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

If my server is still running, you can find the hosted version at [shilangyu.dev/AIF-emotion-detection](https://shilangyu.dev/AIF-emotion-detection). Open the js console and enter `window.debug = true` to see some extra debug info.
