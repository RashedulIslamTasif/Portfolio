import fs from "fs";
import path from "path";
import convert from "heic-convert";

const dir = "public";
for (const f of fs.readdirSync(dir)) {
  if (!/\.heic$/i.test(f)) continue;
  const out = path.join(dir, f.replace(/\.heic$/i, ".jpg"));
  const buf = await convert({ buffer: fs.readFileSync(path.join(dir, f)), format: "JPEG", quality: 0.85 });
  fs.writeFileSync(out, Buffer.from(buf));
  console.log("Converted:", out);
}