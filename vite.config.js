import { defineConfig } from "vite";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));

function htmlIncludes() {
  return {
    name: "html-includes",
    transformIndexHtml: {
      order: "pre",
      handler(html) {
        const pattern = /<!--\s*include:([a-z0-9./_-]+)\s*-->/gi;
        let output = html;

        for (let i = 0; i < 5; i += 1) {
          const next = output.replace(pattern, (_, name) => {
            const file = resolve(root, "src/partials", name.trim());
            if (!existsSync(file)) {
              throw new Error(`Eksik HTML parçası: ${file}`);
            }
            return readFileSync(file, "utf8");
          });
          if (next === output) break;
          output = next;
        }

        return output;
      },
    },
  };
}

export default defineConfig({
  appType: "mpa",
  plugins: [htmlIncludes()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(root, "index.html"),
        kulup: resolve(root, "kulup.html"),
        tarihce: resolve(root, "tarihce.html"),
        baskan: resolve(root, "baskan.html"),
        takimlar: resolve(root, "takimlar.html"),
        fikstur: resolve(root, "fikstur.html"),
        iletisim: resolve(root, "iletisim.html"),
      },
    },
  },
  server: {
    port: 5173,
  },
  preview: {
    port: 4173,
  },
});
