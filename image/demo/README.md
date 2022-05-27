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

The model has to be hosted somewhere. Since it's rather large (20MB+) it is not in the repository. Currently the converted TF.js model is hosted on my private VPS (see the `.env` file). To point the app to a different model use the `VITE_TFJS_MODEL_URL` environment variable.
