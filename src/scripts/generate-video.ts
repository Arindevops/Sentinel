
import { config } from 'dotenv';
config();

import { generateVideoShowcaseFlow, downloadVideo } from '@/ai/flows/generate-video-showcase';
import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

// Initialize Genkit and required plugins for the script
genkit({
    plugins: [googleAI()],
});


async function main() {
    console.log('Starting video generation script...');
    try {
        const videoUrl = await generateVideoShowcaseFlow({
            prompt: 'A cinematic, futuristic visualization of a data center asset monitoring dashboard. Show glowing holographic interfaces with scrolling data, charts, and 3D models of server equipment. Engineers in the background are interacting with the data. High-tech, professional, and sleek visuals.',
        });

        await downloadVideo(videoUrl, 'showcase.mp4');

        console.log('Successfully generated and saved video to showcase.mp4');

    } catch (error) {
        console.error('An error occurred during video generation:', error);
    } finally {
        // Required to allow the script to exit
        process.exit();
    }
}

main();

