import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(request: NextRequest) {
    try {
        const { componentName, componentDescription } = await request.json();

        const response = await resend.emails.send({
            from: 'UI ARTISAN <your-email@example.com>', // Your verified email address
            to: 'recipient@example.com', // Recipient's email address
            subject: 'New Component Suggestion',
            html: `<p><strong>Component Name:</strong> ${componentName}</p>
             <p><strong>Description:</strong></p>
             <p>${componentDescription}</p>`,
        });

        return NextResponse.json({ success: true, message: 'Suggestion sent successfully' });
    } catch (error) {
        console.error('Error sending suggestion:', error);
        return NextResponse.json({ success: false, message: 'Failed to send suggestion' }, { status: 500 });
    }
}