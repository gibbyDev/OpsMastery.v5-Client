import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function VerificationFailedPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle>Verification Failed</CardTitle>
          <CardDescription>We could not verify your email. The link may be invalid or expired.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <span className="text-red-500 text-2xl font-bold">❌ Verification Failed</span>
          <Button asChild variant="outline" className="w-full mt-2">
            <Link href="/auth/sign-up">Try Again</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}