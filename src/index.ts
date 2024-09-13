/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const url = new URL(request.url);
		const parts = url.pathname.split('/');
		const filename = parts.pop()!;
		const newPathname = parts.concat(`elasticsearch-${filename}`).join('/');
		let response: Response;
		try {
			response = await fetch(`https://release.infinilabs.com${newPathname}`);
			if (!response.ok) {
				return response;
			}
		} catch (error: any) {
			return new Response(`Failed to fetch the file: ${error.message}`, { status: 500 });
		}

		// 设置响应头以指示浏览器下载文件，而不是显示内容
		const headers = new Headers({
			'Content-Type': 'application/octet-stream',
			'Content-Disposition': `attachment; filename="${encodeURIComponent(filename)}"`,
		});

		return new Response(response.body, { headers });
	},
} satisfies ExportedHandler<Env>;
