import React from 'react';
import { makeStyles } from '@material-ui/styles';

import Layout from '../components/Layout';
import useCommonStyles from '../templates/commonStyles';
import PostList from '../components/PostList';

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
				<div className={commonClasses.img}>
					<span className={commonClasses.imgText}>Latest posts</span>
				</div>
				<div className={`${commonClasses.content} ${classes.content}`}>
					{/* eslint-disable-next-line react/no-danger */}
					<PostList />
				</div>
			</div>
		</Layout>
	);
};

export default BlogPage;
