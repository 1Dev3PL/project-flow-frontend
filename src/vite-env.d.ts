/// <reference types="vite/client" />
import { ImportMetaEnv } from "vite/types/importMeta";

interface ViteTypeOptions {
  strictImportMetaEnv: unknown;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
