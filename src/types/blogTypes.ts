export interface ICreateBlogRequest {
	title: string;
	excerpts: string | null;
	metaTitle: string;
	metaDescription: string;
	slug: string;
	ogTags: any;
	tcTags: any;
	schemaTags: [];
	isIndex: boolean | undefined;
	content: string;
	featureImageUrl: string;
	readingTime: any;
	isPublished: boolean | undefined;
	parentId: string | null;
	langaugeId: string;
}
