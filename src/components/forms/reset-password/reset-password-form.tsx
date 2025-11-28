"use client";

import { onSignOut } from "@/components/shared/layout/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthInfo } from "@/hooks/use-auth-info";
import { comparePassowrd } from "@/lib/utils";
import { Check, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoMdCheckmark, IoMdClose } from "react-icons/io";
import { toast } from "sonner";

export default function ResetPasswordForm({ hash }: { hash: string }) {
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [token, setToken] = useState("");
	const [correctPassword, setCorrectPassword] = useState(false);
	const [checking, setChecking] = useState(false);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [timeoutExceeded, setTimeoutExceeded] = useState(false);

	const { auth: session } = useAuthInfo();
	const userEmail = session?.user.email;

	const router = useRouter();

	useEffect(() => {
		const sendToken = async () => {
			if (!currentPassword.trim()) {
				setCorrectPassword(false);
				setChecking(false);
				return;
			}
			setChecking(true);
			const check = comparePassowrd(hash, currentPassword);
			if (check) {
				// console.log({ userEmail });
				try {
					const res = await fetch("/api/auth/send-reset-token", {
						headers: { "Content-Type": "application/json" },
						method: "POST",
						body: JSON.stringify({ email: userEmail }),
					});
					const data = await res.json();
					if (data.success) {
						toast.success("Check email for reset code");
						setChecking(false);
						setCorrectPassword(true);
					} else {
						toast.error(
							"Something went wrong with sending code to your email"
						);
					}
				} catch (e: any) {
					console.log("Unable to send code to email", e);
				}
			} else {
				setChecking(true);
				setCorrectPassword(false);
			}
		};
		sendToken();
	}, [currentPassword]);

	useEffect(() => {
		if (!currentPassword.trim() && !newPassword.trim()) {
			setError("");
			return;
		}
		if (confirmPassword !== newPassword) {
			setError("Passwords are not similar");
		} else {
			setError("");
		}
	}, [newPassword, confirmPassword]);

	const passwordValidation = {
		hasEightCharacters: newPassword.length >= 8,
		hasUppercase: /[A-Z]/.test(newPassword),
		hasLowercase: /[a-z]/.test(newPassword),
		hasNumber: /[0-9]/.test(newPassword),
	};

	const passwordChecklist = [
		{
			key: 1,
			state: passwordValidation.hasLowercase,
			message: "Must contain a lowercase letter",
		},
		{
			key: 2,
			state: passwordValidation.hasEightCharacters,
			message: "Must be at least 8 characters",
		},
		{
			key: 3,
			state: passwordValidation.hasUppercase,
			message: "Must contain an uppercase letter",
		},
		{
			key: 4,
			state: passwordValidation.hasNumber,
			message: "Must contain a number",
		},
	];

	const handleSubmit = async () => {
		setLoading(true);
		try {
			const res = await fetch("/api/auth/reset-password", {
				headers: {
					"Content-Type": "application/json",
				},
				method: "POST",
				body: JSON.stringify({
					resetCode: token,
					newPassword,
				}),
			});
			const data = await res.json();

			if (data.success) {
				setLoading(false);
				onSignOut();
				toast.success("Password reset successfully");
			} else {
				setLoading(false);
				toast.error("Password was not reset successfully");
				router.refresh();
			}
		} catch (e: any) {
			console.log("Something went wrong with reseting password", e);
		}
	};

	return (
		<div>
			<div className=" px-[10px] pt-[70px]">
				<div className=" relative">
					<Input
						value={currentPassword}
						onChange={(e) => {
							setCurrentPassword(e.target.value);
						}}
						placeholder="Enter current password"
						disabled={correctPassword}
						className=" py-[25px] rounded-none border-l-0 border-r-0 border-t-0"
					/>
					{checking && (
						<LoaderCircle className=" animate-spin w-5 h-5 absolute right-0 top-1/2 -translate-y-1/2" />
					)}
					{correctPassword && (
						<Check className=" w-5 h-5 absolute right-0 top-1/2 -translate-y-1/2" />
					)}

				</div>
				{!correctPassword && currentPassword !== "" && (
					<p className="  mt-[8px] text-[13px]  text-error">
						This password is not correct
					</p>
				)}

				{correctPassword && (
					<div className=" px-[20px] py-[25px] rounded-[10px] mt-[20px] bg-secondary">
						<p>Enter your new password</p>

						<div className="">
							<Input
								value={token}
								onChange={(e) => setToken(e.target.value)}
								placeholder="Enter token"
								className=" py-[25px] rounded-none border-l-0 border-r-0 border-t-0"
							/>
							{token === "" && (
								<p className=" mt-[8px] text-[13px] text-error">
									Check your email for the token
								</p>
							)}
						</div>

						<div className="">
							<div className="">
								<Input
									value={newPassword}
									onChange={(e) =>
										setNewPassword(e.target.value)
									}
									placeholder="Enter new password"
									className=" py-[25px] rounded-none border-l-0 border-r-0 border-t-0"
								/>
								<div className="text-[13px] mt-[10px]">
									{passwordChecklist.map((check) => (
										<div
											key={check.key}
											className={`flex gap-2 items-center ${check.state
												? "text-white"
												: "text-error"
												}`}
										>
											{check.state ? (
												<IoMdCheckmark />
											) : (
												<IoMdClose />
											)}
											<div>{check.message}</div>
										</div>
									))}
								</div>
							</div>
						</div>

						<div className="">
							<Input
								value={confirmPassword}
								onChange={(e) =>
									setConfirmPassword(e.target.value)
								}
								placeholder="Confirm password"
								disabled={
									!passwordChecklist.every(
										(rule) => rule.state
									)
								}
								className=" py-[25px] rounded-none border-l-0 border-r-0 border-t-0"
							/>
							{error !== "" && confirmPassword !== "" && (
								<p className=" mt-[10px] text-error text-[13px]">
									{error}
								</p>
							)}
						</div>

						<Button
							onClick={handleSubmit}
							disabled={loading}
							className="w-full rounded-[12px] mt-[40px] font-semibold py-[24px]"
						>
							{loading ? (
								<LoaderCircle className=" animate-spin" />
							) : (
								<div className="">
									<p>Submit</p>
								</div>
							)}
						</Button>
					</div>
				)}
			</div>
		</div>
	);
}
