import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const RESPONSES_FILE = path.join(
  process.cwd(),
  'app/components/AIHelper/data/AIQuestionResponses.json'
);

export async function GET() {
  try {
    const fileContent = await fs.readFile(RESPONSES_FILE, 'utf-8');
    const data = JSON.parse(fileContent);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading responses file:', error);
    return NextResponse.json({ qa: [] });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { qa } = body;


    if (!Array.isArray(qa)) {
      return NextResponse.json(
        { error: 'Invalid data format' },
        { status: 400 }
      );
    }

    // Write to file
    await fs.writeFile(
      RESPONSES_FILE,
      JSON.stringify({ qa }, null, 2),
      'utf-8'
    );

    return NextResponse.json({
      success: true,
      message: 'Responses saved successfully',
    });
  } catch (error) {
    console.error('Error saving responses:', error);
    return NextResponse.json(
      { error: 'Failed to save responses' },
      { status: 500 }
    );
  }
}
