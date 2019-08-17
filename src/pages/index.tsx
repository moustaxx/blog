import React from 'react';
import { Link } from 'gatsby';
import { makeStyles } from '@material-ui/styles';

import Layout from '../components/Layout';
import jumbotron from '../../static/img/jumbotron.jpg';

const useStyles = makeStyles({
	root: {
		width: '100%',
		height: '100%',
	},
	content: {
		maxWidth: 1024,
		margin: '72px auto',
		padding: 8,
	},
	img: {
		height: 400,
		backgroundImage: `url(${jumbotron})`,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	imgText: {
		backgroundColor: 'blueviolet',
		color: 'white',
		fontSize: '2.8rem',
		fontWeight: 600,
		padding: 24,
	},
	pageTitle: {
		fontSize: '2.5rem',
		paddingBottom: 16,
	},
}, { name: 'Index' });

const Index = () => {
	const classes = useStyles();

	return (
		<Layout>
			<div className={classes.root}>
				<div className={classes.img}>
					<span className={classes.imgText}>Personal Blog</span>
				</div>
				<div className={classes.content}>
					<h1 className={classes.pageTitle}>Hello World</h1>
					<p>
						Ullam ut reprehenderit tenetur voluptatem voluptatem.
						Recusandae autem unde ut architecto sunt praesentium neque.
						Pariatur alias consectetur veritatis alias.
					</p>
					<p>
						In repellendus et provident vel. Amet commodi repudiandae ad voluptas.
						Occaecati nulla ut voluptatem culpa voluptas eligendi est voluptatem.
						Quia optio distinctio ipsa voluptatem. Ratione ullam praesentium reiciendis.
					</p>
					<p>
						Sunt magni a quas maiores cum ut dolorum. Enim ab aperiam voluptatibus velit.
						Recusandae autem unde ut architecto sunt praesentium neque.
						Pariatur alias consectetur veritatis alias.
					</p>
					<p>
						Deserunt sed rerum dolorem mollitia eum fugit.
						Occaecati nulla ut voluptatem culpa voluptas eligendi est voluptatem.
						Quia optio distinctio ipsa voluptatem. Ratione ullam praesentium reiciendis.
					</p>
					<p>
						Ullam ut reprehenderit tenetur voluptatem voluptatem.
						Recusandae autem unde ut architecto sunt praesentium neque.
						Pariatur alias consectetur veritatis alias.
					</p>
					<p>
						In repellendus et provident vel. Amet commodi repudiandae ad voluptas.
						Occaecati nulla ut voluptatem culpa voluptas eligendi est voluptatem.
						Quia optio distinctio ipsa voluptatem. Ratione ullam praesentium reiciendis.
					</p>
					<p>
						Totam veniam dolor est iusto. Expedita autem et consectetur enim nulla soluta est.
						Sed eius quo esse culpa. Error consequatur et at.
					</p>
					<p>
						Sint sed voluptatibus et omnis qui necessitatibus qui cupiditate.
						Ipsa dolorum quo incidunt pariatur cum.
						Consequuntur deserunt iste inventore nesciunt itaque qui aut cupiditate.
					</p>
					<p>
						Ut natus laboriosam est laboriosam. Vel odio nulla et et.
						Recusandae ducimus earum maiores qui sapiente eligendi.
						Suscipit architecto quasi optio deleniti qui qui est. Qui enim consequatur autem.
					</p>
					<Link to="/dsadasds">Link</Link>
				</div>
			</div>
		</Layout>
	);
};

export default Index;
