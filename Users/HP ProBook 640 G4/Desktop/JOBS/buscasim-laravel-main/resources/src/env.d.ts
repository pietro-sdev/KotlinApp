/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_TOKEN_KEY: string;
  readonly VITE_APP_NAME: string;
  readonly VITE_PUSHER_APP_KEY: string;
  readonly VITE_PUSHER_HOST: string;
  readonly VITE_PUSHER_PORT: string;
  readonly VITE_PUSHER_SCHEME: string;
  readonly VITE_PUSHER_APP_CLUSTER: string;
  readonly VITE_GOOGLE_TAG_ID: string;
  readonly VITE_GOOGLE_ADS_ID: string;
  readonly VITE_GOOGLE_CAPTCHA_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
