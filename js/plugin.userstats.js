/**
 * User Statistics
 * ---------------
 * Shows involved users ranked by their involvement
 */

analysePlugins.push({
  _tpl_author: _.template("<tr><td><img src='<%= avatarurl %>'></td><td><%= name %></td><td><%= comments %></td></tr>"),

  title: "User statistics",

  run: function (interactions, targetElement) {
    var authors = {}; // use object for hashmap-behaviour when counting comments

    for(var i=0; i<interactions.comments.length; i++) {
      var comment = interactions.comments[i];

      if(authors[comment.author.guid] === undefined) {
        authors[comment.author.guid] = {"comments": 1, "avatarurl": comment.author.avatar.small, "name": comment.author.name};
      } else {
        authors[comment.author.guid].comments++;
      }
    }

    // convert object to array
    var authorArr = [];
    _.each(authors, function(value, key) {
      authorArr.push(value);
    });

    // sort authors by number of comments
    authorArr.sort(function(a, b) {
      return b.comments - a.comments;
    });

    // generate list
    var authorHtml = "";
    for(var i=0; i<authorArr.length; i++) {
      authorHtml += this._tpl_author(authorArr[i]);
    }

    targetElement.html("<table><tr><th>Ava</th><th>Name</th><th>Number of Comments</th></tr>" + authorHtml + "</table>");
  }
});