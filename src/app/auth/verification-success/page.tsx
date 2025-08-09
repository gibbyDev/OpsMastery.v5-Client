import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function VerificationSuccessPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle>Email Verified</CardTitle>
          <CardDescription>Your email has been successfully verified. You can now sign in.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <span className="text-green-600 text-2xl font-bold">✅ Verified</span>
          <Button asChild className="w-full mt-2">
            <Link href="/auth/sign-in">Go to Sign In</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}