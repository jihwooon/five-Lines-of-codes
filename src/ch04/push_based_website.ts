class Website1 {
  constructor(private url: string) { }

  generateLink(name: string, id: string) {
    return this.url + name + id;
  }
}

class User1 {
  constructor(private username: string) { }

  generateLink(website: Website1, id: string) {
    return website.generateLink(this.username, id);
  }
}

class BlogPost1 {
  constructor(private author: User1, private id: string) { }

  generateLink(website: Website1) {
    return this.author.generateLink(website, this.id);
  }
}

const generatePostLink1 = (website: Website1, post: BlogPost1) => post.generateLink(website);
