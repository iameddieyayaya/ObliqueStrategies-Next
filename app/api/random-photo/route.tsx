import { NextRequest, NextResponse } from 'next/server';
import { createApi } from 'unsplash-js';
import nodeFetch from 'node-fetch';

export async function GET(req: NextRequest) {
  const unsplash = createApi({
    accessKey: process.env.UNSPLASH_ACCESS_KEY!,
    fetch: nodeFetch as unknown as typeof fetch,
  });

  try {
    const result = await unsplash.photos.getRandom({ query: "texture, patterns", orientation: "landscape" });

    if (result.errors) {
      return NextResponse.json({ error: "Error fetching image from Unsplash." }, { status: 500 });
    } else {
      let imageUrl: string | undefined;

      if (Array.isArray(result.response)) {
        imageUrl = result.response[0]?.urls?.regular;
      } else {
        imageUrl = result.response?.urls?.regular;
      }

      if (!imageUrl) {
        return NextResponse.json({ error: "Image URL not found." }, { status: 404 });
      }

      return NextResponse.json({ imageUrl }, { status: 200, headers: { 'Cache-Control': 'no-store' } });
    }
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error." }, { status: 500, headers: { 'Cache-Control': 'no-store' } });
  }
}