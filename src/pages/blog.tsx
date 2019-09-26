import React from 'react';

import useCommonStyles from '../templates/commonStyles';
import Layout from '../components/Layout';
import PostList from '../components/PostList';
import HeaderImg from '../components/HeaderImg';

// const useStyles = makeStyles({
// 	content: {
// 	},
// }, { name: 'BlogPage' });

const BlogPage = () => {
	// const classes = useStyles();
	const commonClasses = useCommonStyles();

	return (
		<Layout>
			<div>
				<HeaderImg title="Latest posts" />
				<div className={commonClasses.content}>
					<PostList />
				</div>
			</div>
		</Layout>
	);
};

export default BlogPage;
