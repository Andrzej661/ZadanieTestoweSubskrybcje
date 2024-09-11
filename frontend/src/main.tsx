import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import { NextUIProvider } from "@nextui-org/react"
import "./styles/styles.css"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { BrowserRouter } from "react-router-dom"
ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<BrowserRouter>
			<NextUIProvider>
				<NextThemesProvider>
					<App />
				</NextThemesProvider>
			</NextUIProvider>
		</BrowserRouter>
	</React.StrictMode>
)
