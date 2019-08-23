import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { graphql, useStaticQuery, Link } from 'gatsby';
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
}, { name: 'PostList' });

interface IGetPosts {
	allMarkdownRemark: {
		edges: {
			node: {
				id: string;
				frontmatter: IFrontmatter;
				excerpt: string;
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
				frontmatter: {path: {regex: "/blog\//"}}
			}
		){
			edges {
				node {
					id
					frontmatter {
						path
						title
						date(formatString: "DD MMMM YYYY")
					}
					excerpt(pruneLength: 700)
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
			{edges.map(({ node }) => (
				<div className={classes.post} key={node.id}>
					<h1>
						<Link
							to={node.frontmatter.path}
							className={classes.title}
							children={node.frontmatter.title}
						/>
					</h1>
					<h4 className={classes.date}>{node.frontmatter.date}</h4>
					<div>{node.excerpt}</div>
				</div>
			))}
		</div>
	);
};

export default PostList;
