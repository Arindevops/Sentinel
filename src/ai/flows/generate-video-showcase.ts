
'use server';

/**
 * @fileOverview A Genkit flow to generate a short video showcase of the application.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import * as fs from 'fs';
import { Readable } from 'stream';
import type {MediaPart} from 'genkit';

const GenerateVideoShowcaseInputSchema = z.object({
  prompt: z.string().describe('A text prompt describing the video content.'),
});
export type GenerateVideoShowcaseInput = z.infer<typeof GenerateVideoShowcaseInputSchema>;

export const generateVideoShowcaseFlow = ai.defineFlow(
  {
    name: 'generateVideoShowcaseFlow',
    inputSchema: GenerateVideoShowcaseInputSchema,
    outputSchema: z.string(),
  },
  async ({prompt}) => {
    console.log('Starting video generation...');
    let { operation } = await ai.generate({
        model: googleAI.model('veo-2.0-generate-001'),
        prompt: prompt,
        config: {
          durationSeconds: 5,
          aspectRatio: '16:9',
        },
      });
    
      if (!operation) {
        throw new Error('Expected the model to return an operation');
      }
    
      console.log('Video generation in progress. This may take a minute...');
      // Wait until the operation completes.
      while (!operation.done) {
        operation = await ai.checkOperation(operation);
        // Sleep for 5 seconds before checking again.
        await new Promise((resolve) => setTimeout(resolve, 5000));
        console.log('Checking operation status...');
      }
    
      if (operation.error) {
        throw new Error('Failed to generate video: ' + operation.error.message);
      }
    
      const video = operation.output?.message?.content.find((p) => !!p.media);
      if (!video) {
        throw new Error('Failed to find the generated video');
      }
      console.log('Video generated successfully.');

      return video.media!.url;
  }
);

export async function downloadVideo(videoUrl: string, path: string): Promise<void> {
    const fetch = (await import('node-fetch')).default;
    // Add API key before fetching the video.
    const videoDownloadResponse = await fetch(
      `${videoUrl}&key=${process.env.GEMINI_API_KEY}`
    );
    if (
      !videoDownloadResponse ||
      videoDownloadResponse.status !== 200 ||
      !videoDownloadResponse.body
    ) {
      throw new Error('Failed to fetch video');
    }
    
    console.log(`Downloading video to ${path}...`);
    const fileStream = fs.createWriteStream(path);
    await new Promise((resolve, reject) => {
        Readable.from(videoDownloadResponse.body!).pipe(fileStream);
        videoDownloadResponse.body!.on('error', reject);
        fileStream.on('finish', resolve);
    });
    console.log('Video download complete.');
  }

