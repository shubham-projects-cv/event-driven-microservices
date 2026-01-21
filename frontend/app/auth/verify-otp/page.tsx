"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useVerifyOtp } from "@/hooks/useAuth";

export default function VerifyOtpPage() {
  const params = useSearchParams();
  const router = useRouter();
  const verifyOtp = useVerifyOtp();

  const email = params.get("email") ?? "";
  const [otp, setOtp] = useState("");

  const submit = () => {
    verifyOtp.mutate(
      { email, otp },
      { onSuccess: () => router.push("/auth/login") },
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-xl font-semibold">Verify OTP</CardHeader>
        <CardContent className="space-y-4">
          <Input value={email} disabled />
          <Input
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <Button
            className="w-full"
            onClick={submit}
            disabled={verifyOtp.isPending}
          >
            Verify
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
