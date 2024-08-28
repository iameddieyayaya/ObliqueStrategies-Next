import { NextRequest, NextResponse } from 'next/server';
import { createApi } from 'unsplash-js';
import nodeFetch from 'node-fetch';

export async function GET(req: NextRequest) {
  const unsplash = createApi({
    accessKey: process.env.UNSPLASH_ACCESS_KEY!,
    fetch: nodeFetch,
  });

  try {
    const result = await unsplash.photos.getRandom({ query: "texture, patterns", orientation: "landscape" });

    if (result.errors) {
      return NextResponse.json({ error: "Error fetching image from Unsplash." }, { status: 500 });
    } else {
      const imageUrl = result.response?.urls.regular;
      return NextResponse.json({ imageUrl }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error." }, { status: 500 });
  }
}
