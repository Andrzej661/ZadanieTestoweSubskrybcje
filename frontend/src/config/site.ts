export type SiteConfig = typeof siteConfig

export const siteConfig = {
	name: "EmailProgram",
	description: "Send things",
	navItems: [
		{
			label: "Buy",
			href: "/"
		},
		{
			label: "Menage",
			href: "/menage"
		}

		// {
		// 	label: "Library",
		// 	href: "/library"
		// },
		// {
		// 	label: "Credits",
		// 	href: "/credits"
		// }
	],
	navMenuItems: [
		{
			label: "Buy",
			href: "/"
		},
		{
			label: "Menage",
			href: "/menage"
		}
		// {
		// 	label: "Library",
		// 	href: "/library"
		// },
		// {
		// 	label: "Credits",
		// 	href: "/credits"
		// }
	]
}
