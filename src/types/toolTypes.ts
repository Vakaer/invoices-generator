export interface ICreateToolRequest {
	name: string;
	excerpts: string | null;
	metaTitle: string;
	metaDescription: string;
	slug: string;
	ogTags: any;
	tcTags: any;
	schemaTags: any;
	isIndex: boolean | undefined;
	isPublished: boolean | undefined;
	isItHome: boolean | undefined;
	content: any;
	parentId: string | null;
	langaugeId: string;
}
export interface ITool {
	name: string;
	metaTitle: string;
	metaDescription: string;
	slug: string;
	ogTags: string;
	tcTags: string;
	schemaTags: string;
	isIndex: boolean;
	isPublished: boolean;
	isItHome: boolean;
	parentId: string | null;
	langaugeId: string;
	content:Record<string,IContent>
}

export interface IToolList {
	id: string
	name: string
	metaTitle: string
	metaDescription: string
	slug: string
	ogTags: any
	tcTags: any
	schemaTags: any
	isIndex: boolean
	isPublished: boolean
	isItHome: boolean
	content: Record<string,IContent>
	parentId: any
	langaugeId: string 
	language?: Language
  }
  
  export interface IContent{
	key: string;
	value: string;
	textFieldType: string;
  }
  export interface Language {
	id: string
	name: string
	short: string
	createdAt: string
	updatedAt: string
  }