import { Metadata, ResolvingMetadata } from 'next';
import { getDataApiCall } from '../../../utils/getData';
import {} from '../../../libs/exception';

export async function generateMetadata(
	{ params: { slug } }: { params: { slug: string } },
	parent: ResolvingMetadata,
): Promise<Metadata> {
	const toolData = await getDataApiCall(
		`http://localhost:3000/api/tool/slug?slug=${slug}`,
		);
	const {
		ogTags,
		tcTags,
		isIndex,
		metaTitle,
		metaDescription,
		createdAt,
		updatedAt,
	} = toolData.tool;

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
	const tool = await getDataApiCall(`http://localhost:3000/api/tool/slug?slug=${slug}`);
	const {content,schemaTags} = tool.tool;
	const schemaTagsParse = await JSON.parse(schemaTags);
	console.log('schemaTagsParse : ', schemaTagsParse);



	return (
		<>
		{schemaTagsParse && schemaTagsParse.map((value: any, index: number) => {
			return(	
				<script
					key={index}
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(value) }}
				/>
			)
		})}
			<div>
				<p>page</p>
			</div>
		</>
	);
};

export default page;
