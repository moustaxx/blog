import React from 'react';
import { useTranslation } from 'gatsby-plugin-react-i18next';

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
	const { t } = useTranslation();

	return (
		<Layout>
			<div>
				<HeaderImg title={t('latestPosts')} />
				<div className={commonClasses.content}>
					<PostList />
				</div>
			</div>
		</Layout>
	);
};

export default BlogPage;
