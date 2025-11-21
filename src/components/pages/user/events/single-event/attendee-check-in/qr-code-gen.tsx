"use client";

import { QRCodeCanvas } from "qrcode.react";

export default function QrCodeGenerator({
  value,
  size,
}: {
  value: string;
  size?: number;
}) {
  return (
    <div className="">
      <QRCodeCanvas value={value} size={size} />
    </div>
  );
}
