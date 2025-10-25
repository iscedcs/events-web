declare module "react-qrcode-scanner-mi" {
  import React from "react";

  interface QrScannerProps {
    onScan?: (data: string | null) => void;
    onError?: (error: any) => void;
    facingMode?: "user" | "environment";
    className?: string;
  }

  export const QrScanner: React.FC<QrScannerProps>;
}
