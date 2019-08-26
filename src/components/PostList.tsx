import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { graphql, useStaticQuery, Link } from 'gatsby';
import Img from 'gatsby-image';

import { IFrontmatter } from '../interfaces';

const useStyles = makeStyles({
	post: {
	},
	title: {
		color: 'inherit',
		background: 'none',
	},
	date: {
		margin: 0,
		paddingBottom: 8,
	},
	featuredImg: {
		margin: '16px 0',
	},
}, { name: 'PostList' });

interface IGetPosts {
	allMarkdownRemark: {
		edges: {
			node: {
				id: string;
				frontmatter: IFrontmatter;
				excerpt: string;
				fields: {
					slug: string;
				};
			};
		}[];
	};
}

const getPosts = graphql`
	query getPosts {
		allMarkdownRemark(
			sort: {order: DESC, fields: [frontmatter___date]}, 
			limit: 1000, 
			filter: {
				frontmatter: {templateKey: {eq: "postTemplate"}}
			}
		){
			edges {
				node {
					id
					frontmatter {
						title
						date(formatString: "dddd, DD MMMM YYYY")
						featuredImage {
							childImageSharp {
								fluid(maxWidth: 800) {
									...GatsbyImageSharpFluid
								}
							}
						}
					}
					excerpt(pruneLength: 700)
					fields {
						slug
					}
				}
			}
		}
	}
`;

const PostList = () => {
	const classes = useStyles();
	const data = useStaticQuery<IGetPosts>(getPosts);

	const { edges } = data.allMarkdownRemark;
	return (
		<div>
			{edges.map(({ node }) => {
				const fluid = node.frontmatter.featuredImage
					&& node.frontmatter.featuredImage.childImageSharp.fluid;

				return (
					<article className={classes.post} key={node.id}>
						<h1>
							<Link
								to={node.fields.slug}
								className={classes.title}
								children={node.frontmatter.title}
							/>
						</h1>
						<h4 className={classes.date}>{node.frontmatter.date}</h4>
						{fluid && <Img fluid={fluid} className={classes.featuredImg} />}
						<div>{node.excerpt}</div>
					</article>
				);
			})}
		</div>
	);
};

export default PostList;
