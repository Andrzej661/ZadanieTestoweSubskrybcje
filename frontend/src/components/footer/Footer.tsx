import React from "react"
import { Logo } from "../icons"
import { useNavigate } from "react-router-dom"
const Footer = () => {
	const navigate = useNavigate()
	return (
		<div className="mt-96  flex flex-col items-center pt-2">
			<div className="w-full max-w-screen-3xl border-b-1 border-default-100 p-1">
				<Logo
					className="mx-auto cursor-pointer text-primary"
					onClick={() => navigate("")}
				/>
			</div>
			<div className="grid w-full max-w-screen-md place-items-center gap-2 pb-0 pt-4   sm:grid-cols-3 sm:justify-items-center  ">
				<div
					className="w-fit text-center
sm:text-left">
					<div
						onClick={() => navigate("")}
						className="cursor-pointer border-b-1 border-primary-400 py-1 text-default-600 hover:border-primary-100 hover:text-default-500 sm:w-fit">
						Link
					</div>
				</div>
			</div>
			<div className="mt-8 w-full bg-gray-100 text-center text-black">
				Andrzej Suchecki @2024
			</div>
		</div>
	)
}
export default Footer
