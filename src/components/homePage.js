import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { fetchPosts } from '../actions';

/* Some UI Components adapted from Material UI */
const styles = {
  card: {
    position: 'relative',
    marginBottom: '3%',
    minWidth: '25%',
    maxWidth: '25%',
    marginTop: '3%',
    marginLeft: '5%',

  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
};

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.renderPosts = this.renderPosts.bind(this);
  }

  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    const { classes } = this.props;
    return this.props.posts.map((post) => {
      return (
        <Card key={post._id} className={classes.card}>
          <CardMedia
            className={classes.media}
            image={post.cover_url}
            title="Post Image"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {post.title}
            </Typography>
            <Typography component="p" style={{ fontStyle: 'italic', textAlign: 'right' }}>
              author: {post.author}
            </Typography>
            <Typography className="tags" component="p" style={{ fontStyle: 'italic', textAlign: 'right', marginBottom: '10%' }}>
              tags: {post.tags}
            </Typography>

          </CardContent>
          <CardActions style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            position: 'absolute',
            width: '100%',
            bottom: '0px',
            alignItems: 'flex-end',
          }}
          >
            <Button size="small" color="primary">
              <Link style={{ textDecoration: 'none' }}
                to={{
                  pathname: `/posts/${post._id}`,
                }}
              >
                View Post
              </Link>
            </Button>
          </CardActions>
        </Card>

      );
    });
  }

  render() {
    return (
      <div className="home-page-posts">
        {this.renderPosts()}
      </div>

    );
  }
}

const mapStateToProps = state => (
  {
    posts: state.posts.all,
  }
);

export default withStyles(styles)(withRouter(connect(mapStateToProps, { fetchPosts })(HomePage)));
