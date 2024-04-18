import { Metadata, ResolvingMetadata } from 'next';
import { getDataApiCall } from '../../../utils/getData';
import {} from '../../../libs/exception';
import { json } from 'node:stream/consumers';

export async function generateMetadata(
	{ params: { slug } }: { params: { slug: string } },
	parent: ResolvingMetadata,
): Promise<Metadata> {
	const blogData = await getDataApiCall(
		`http://localhost:3000/api/blog/slug?slug=${slug}`,
	);

	const {
		ogTags,
		tcTags,
		isIndex,
		metaTitle,
		metaDescription,
		createdAt,
		updatedAt,
	} = blogData.blog;

	const metaTags: any = {
		title: metaTitle,
		description: metaDescription,
		robots: {
			index: isIndex,
			follow: isIndex,
			googleBot: {
				index: isIndex,
				follow: isIndex,
			},
		},
	};

	if (ogTags) {
		const ogTagsParse = await JSON.parse(ogTags);
		const openGraph = {
			title: ogTagsParse.title,
			description: ogTagsParse.description,
			url: ogTagsParse.url,
			siteName: ogTagsParse.siteName,
			images: [
				{
					url: ogTagsParse.images,
					width: 800,
					height: 600,
				},
			],
			locale: ogTagsParse.locale ? ogTagsParse.locale : 'en_US',
			type: ogTagsParse.type ? ogTagsParse.type : 'article',
			publishedTime: new Date(createdAt).toISOString(),
			modifiedTime: new Date(updatedAt || createdAt).toISOString(),
		};
		metaTags['openGraph'] = openGraph;
	}

	if (tcTags) {
		const tcTagsParse = await JSON.parse(tcTags);
		const twitter = {
			card: tcTagsParse.card,
			title: tcTagsParse.title,
			description: tcTagsParse.description,
			images: tcTagsParse,
		};
		metaTags['twitter'] = twitter.images;
	}

	return metaTags;
}

const page = async ({ params: { slug } }: { params: { slug: string } }) => {
	const blog:any = await getDataApiCall(`http://localhost:3000/api/blog/slug?slug=${slug}`);
	const { content, schemaTags } = blog.blog;
	const schemaTagsParse = await JSON.parse(schemaTags);
	return (
		<>
		{schemaTagsParse && schemaTagsParse.map((value:any) => {
			return(	
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(value) }}
				/>
			)
		})}
			<div>
				<p>page</p>
				<article>
					<div dangerouslySetInnerHTML={{ __html: content }} />
				</article>
			</div>
		</>
	);
};

export default page;
