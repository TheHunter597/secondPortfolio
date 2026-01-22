 export const revalidate = 10;
import { NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('learned_data')
      .select('id, question, answer')
      .order('created_at', { ascending: false });
    console.log({data});
    
    if (error) {
      console.error('Error fetching learned data:', error);
      return NextResponse.json({ qa: [] });
    }

    // Transform Supabase rows to QA format
    const qa = (data || []).map((row: any) => ({
      id: row.id,
      question: row.question,
      // Supabase stores answer as JSONB; normalize to string for the UI
      answer: typeof row.answer === 'string' ? row.answer : row.answer?.text ?? '',
    }));

    return NextResponse.json({ qa });
  } catch (error) {
    console.error('Error in GET /api/ai-responses:', error);
    return NextResponse.json({ qa: [] });
  }
}
