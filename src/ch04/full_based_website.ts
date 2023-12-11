class Website {
  constructor(private url: string) { }

  getUrl() { return this.url; }
}

class User {
  constructor(private username: string) { }

  getUsername() { return this.username; }
}

class BlogPost {
  constructor(private author: User, private id: string) { }

  getId() { return this.id; }

  getAuthor() { return this.author; }
}

const generatePostLink = (website: Website, post: BlogPost) => {
  const url = website.getUrl();
  const user = post.getAuthor();
  const name = user.getUsername();
  const postId = post.getId();

  return url + name + postId;
};
