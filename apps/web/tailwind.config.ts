import type { Config } from "tailwindcss";
import sharedConfig from "@repo/tailwind-config";
import path from "path";

const config: Pick<Config, "content" | "presets"> = {
  content: [
    "./app/**/*.tsx",
    path.join(__dirname, "../../packages/ui/src/**/*.{ts,tsx}"),
  ],
  presets: [sharedConfig],
};

export default config;
