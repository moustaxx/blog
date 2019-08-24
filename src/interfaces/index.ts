export interface IFrontmatter {
	templateKey: string;
	date?: string;
	title: string;
	featuredImage?: {
		childImageSharp: {
			fluid: {
				src: string;
				srcSet: string;
				aspectRatio: number;
				sizes: string;
				base64: string;
			};
		};
	};
}
