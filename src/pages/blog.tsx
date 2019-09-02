import React from 'react';
import { makeStyles } from '@material-ui/styles';

import useCommonStyles from '../templates/commonStyles';
import Layout from '../components/Layout';
import PostList from '../components/PostList';
import HeaderImg from '../components/HeaderImg';

const useStyles = makeStyles({
	content: {
		marginBottom: 48,
	},
}, { name: 'BlogPage' });

const BlogPage = () => {
	const classes = useStyles();
	const commonClasses = useCommonStyles();

	return (
		<Layout>
			<div>
				<HeaderImg title="Latest posts" />
				<div className={`${commonClasses.content} ${classes.content}`}>
					{/* eslint-disable-next-line react/no-danger */}
					<PostList />
				</div>
			</div>
		</Layout>
	);
};

export default BlogPage;
