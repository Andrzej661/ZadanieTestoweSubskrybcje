import { routerType } from "../types/router.types"
import LoginPage from "./pages/LoginPage"
import MenagePage from "./pages/MenagePage"

const pagesData: routerType[] = [
	{
		path: "",
		element: <LoginPage />,
		title: "LoginPage"
	},
	{
		path: "menage",
		element: <MenagePage />,
		title: "LoginPage"
	}
]

export default pagesData
