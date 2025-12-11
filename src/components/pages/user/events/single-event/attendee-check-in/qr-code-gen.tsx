"use client";

import { QRCodeCanvas } from "qrcode.react";

export default function QrCodeGenerator({
	className,
	value,
	size,
}: {
	className?: string;
	value: string;
	size?: number;
}) {
	return (
		<div className={`${className}`}>
			<QRCodeCanvas value={value} size={size} />
		</div>
	);
}
