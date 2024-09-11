export const logoutUser = () => {
	// Remove the token from session storage
	// const deleteAllCookies = () => {
	// 	const cookies = document.cookie.split(";")

	// 	for (const cookie of cookies) {
	// 		const [name] = cookie.split("=")
	// 		document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
	// 	}
	// }

	// // Delete all cookies
	// deleteAllCookies()
	window.location.reload()
	// Confirm logout
	console.log("Logged out successfully")
}
