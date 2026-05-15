import { createReadStream, existsSync, statSync } from "fs";
import { join } from "path";
import { Readable } from "stream";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const HERO_NAMES = ["hero.mp4", "hero.MP4", "Hero.mp4"] as const;

function resolveHeroPath(): string | null {
  const dir = join(process.cwd(), "public", "videos");
  for (const name of HERO_NAMES) {
    const p = join(dir, name);
    if (existsSync(p)) return p;
  }
  return null;
}

export async function HEAD() {
  const path = resolveHeroPath();
  if (!path) {
    return new NextResponse(null, { status: 404 });
  }
  const size = statSync(path).size;
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Content-Type": "video/mp4",
      "Content-Length": String(size),
      "Accept-Ranges": "bytes",
      "Cache-Control": "public, max-age=300",
    },
  });
}

export async function GET(req: NextRequest) {
  const path = resolveHeroPath();
  if (!path) {
    return new NextResponse(null, { status: 404 });
  }

  const { size } = statSync(path);
  const range = req.headers.get("range");

  if (range?.startsWith("bytes=")) {
    const [, spec] = range.split("bytes=", 2);
    const [startRaw, endRaw] = (spec ?? "").split("-", 2);
    let start = parseInt(startRaw || "0", 10);
    let end = endRaw === "" || endRaw === undefined ? size - 1 : parseInt(endRaw, 10);

    if (Number.isNaN(start) || start < 0) start = 0;
    if (Number.isNaN(end) || end < 0) end = size - 1;
    if (start >= size) {
      return new NextResponse(null, {
        status: 416,
        headers: { "Content-Range": `bytes */${size}` },
      });
    }
    end = Math.min(end, size - 1);
    if (start > end) {
      return new NextResponse(null, {
        status: 416,
        headers: { "Content-Range": `bytes */${size}` },
      });
    }

    const chunkSize = end - start + 1;
    const nodeStream = createReadStream(path, { start, end });
    const webStream = Readable.toWeb(nodeStream) as unknown as ReadableStream;

    return new NextResponse(webStream, {
      status: 206,
      headers: {
        "Content-Range": `bytes ${start}-${end}/${size}`,
        "Accept-Ranges": "bytes",
        "Content-Length": String(chunkSize),
        "Content-Type": "video/mp4",
        "Cache-Control": "public, max-age=300",
      },
    });
  }

  const nodeStream = createReadStream(path);
  const webStream = Readable.toWeb(nodeStream) as unknown as ReadableStream;

  return new NextResponse(webStream, {
    status: 200,
    headers: {
      "Content-Length": String(size),
      "Content-Type": "video/mp4",
      "Accept-Ranges": "bytes",
      "Cache-Control": "public, max-age=300",
    },
  });
}
