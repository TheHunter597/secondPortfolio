 export const revalidate = 10;
import { NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('learned_data')
      .select('id, question, answer')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching learned data:', error);
      return NextResponse.json({ qa: [] });
    }

    // Transform Supabase rows to QA format
    const qa = (data || []).map((row: any) => {
      let answerText = typeof row.answer === 'string' ? row.answer : row.answer?.text ?? '';
      
      // Replace literal \n with actual newlines for proper markdown rendering
      answerText = answerText.replace(/\\n/g, '\n');
      
      return {
        id: row.id,
        question: row.question,
        answer: answerText,
      };
    });

    return NextResponse.json({ qa });
  } catch (error) {
    console.error('Error in GET /api/ai-responses:', error);
    return NextResponse.json({ qa: [] });
  }
}
