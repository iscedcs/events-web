"use client";

import { useRouter } from "next/navigation";
import { MdArrowBack } from "react-icons/md";
import { startTransition } from "react";

export default function BackButton({ className }: { className: string }) {
	const router = useRouter();

	return (
		<MdArrowBack
			className={className}
			onClick={() => {
				startTransition(() => {
					router.back();
					router.refresh();
				});
			}}
		/>
	);
}
