/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TFJS_MODEL_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
